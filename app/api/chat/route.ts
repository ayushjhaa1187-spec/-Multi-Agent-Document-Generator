import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { prisma } from '@/lib/prisma';
import { BRD_PLANNER_SYSTEM_PROMPT } from '@/lib/agents/brd-planner';
import { REQUIREMENT_WRITER_SYSTEM_PROMPT } from '@/lib/agents/requirement-writer';
import { recordMetric } from '@/lib/performance';
import { analyticsTracker } from '@/lib/analytics';
import { cacheManager } from '@/lib/cache';
import { saveBRD } from '@/lib/services/project';

export const maxDuration = 60;

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const { messages, projectName } = await req.json();

    // Validate messages array shape (Security Enhancement: Input Validation)
    const messagesValid =
      Array.isArray(messages) &&
      messages.length > 0 &&
      messages.length <= 50 && // Limit message count
      messages.every(
        (m) =>
          m &&
          typeof m === 'object' &&
          typeof m.role === 'string' &&
          ['user', 'assistant', 'system'].includes(m.role) && // Validate role
          typeof m.content === 'string' &&
          m.content.trim().length > 0 &&
          m.content.length <= 5000 // Limit content length
      );

    if (!messagesValid) {
      const duration = Date.now() - startTime;
      recordMetric('/api/chat', duration, 400);
      analyticsTracker.trackApiRequest('/api/chat', duration, 400, 'Invalid messages format');
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (
      !projectName ||
      typeof projectName !== 'string' ||
      projectName.trim().length === 0 ||
      projectName.length > 100 // Limit project name length
    ) {
      const duration = Date.now() - startTime;
      recordMetric('/api/chat', duration, 400);
      analyticsTracker.trackApiRequest('/api/chat', duration, 400, 'Invalid project name');
      return new Response(
        JSON.stringify({ error: 'Invalid project name' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      recordMetric('/api/chat', Date.now() - startTime, 503);
      return new Response(
        JSON.stringify({ error: 'Database connection failed' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Run planner to decide flow; keep prompt identical
    const plannerResult = await streamText({
      model: openai('gpt-4o'),
      system: BRD_PLANNER_SYSTEM_PROMPT,
      messages,
    });

    const plannerText = await plannerResult.text;

    // Decide purely from model output; do not trust client-supplied stage
    const lines = plannerText.split('\n').map((l) => l.trim()).filter(Boolean);
    const allQuestions = lines.length > 0 && lines.every((l) => l.endsWith('?'));
    const containsQuestionKeywords =
      plannerText.toLowerCase().includes('please clarify') ||
      plannerText.toLowerCase().includes('could') ||
      plannerText.toLowerCase().includes('would');
    const needsClarification =
      allQuestions ||
      (plannerText.includes('?') && containsQuestionKeywords);

    if (needsClarification) {
      recordMetric('/api/chat', Date.now() - startTime, 200);
      return plannerResult.toDataStreamResponse();
    }

    const writerResult = await streamText({
      model: openai('gpt-4o'),
      system: REQUIREMENT_WRITER_SYSTEM_PROMPT,
      messages: [
        ...messages,
        { role: 'assistant', content: plannerText },
      ],
      onFinish: async ({ text }) => {
        await saveBRD(text, projectName, messages);
      },
    });

    recordMetric('/api/chat', Date.now() - startTime, 200);
    analyticsTracker.trackApiRequest('/api/chat', Date.now() - startTime, 200);
    analyticsTracker.trackUserAction('brd_generation', {
      projectName,
      messageCount: messages.length,
      stage: 'generation',
    });
    return writerResult.toDataStreamResponse();
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('API error:', error);

    if (error instanceof Error) {
      analyticsTracker.trackError(error, {
        endpoint: '/api/chat',
        duration,
      });
    }

    if (error instanceof Error && error.message.includes('API')) {
      recordMetric('/api/chat', duration, 503);
      analyticsTracker.trackApiRequest('/api/chat', duration, 503, 'AI Service Error');
      return new Response(
        JSON.stringify({
          error: 'AI Service Error',
          message: 'The AI service is unavailable right now. Please try again shortly.',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    recordMetric('/api/chat', duration, 500);
    analyticsTracker.trackApiRequest('/api/chat', duration, 500, 'Internal server error');
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
