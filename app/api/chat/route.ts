import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { prisma } from '@/lib/prisma';
import { BRD_PLANNER_SYSTEM_PROMPT } from '@/lib/agents/brd-planner';
import { REQUIREMENT_WRITER_SYSTEM_PROMPT } from '@/lib/agents/requirement-writer';
import { saveGeneratedBRD } from '@/lib/services/project';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages, projectName, stage } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!projectName || typeof projectName !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid project name' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return new Response(
        JSON.stringify({ error: 'Database connection failed' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const plannerResult = await streamText({
      model: openai('gpt-4o'),
      system: BRD_PLANNER_SYSTEM_PROMPT,
      messages,
    });

    const plannerText = await plannerResult.text;

    const needsClarification =
      stage !== 'generate' &&
      (plannerText.includes('?') &&
        (plannerText.toLowerCase().includes('could') ||
          plannerText.toLowerCase().includes('would') ||
          plannerText.toLowerCase().includes('please clarify') ||
          plannerText.split('\n').some((line) => line.trim().endsWith('?'))));

    if (needsClarification) {
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
        try {
          if (!text || text.trim().length === 0) {
            console.warn('Empty text received from AI model');
            return;
          }

          await saveGeneratedBRD(
            projectName,
            messages[0]?.content,
            messages[messages.length - 1]?.content,
            text
          );
        } catch (error) {
          console.error('Database save error:', error);
        }
      },
    });

    return writerResult.toDataStreamResponse();
  } catch (error) {
    console.error('API error:', error);

    if (error instanceof Error && error.message.includes('API')) {
      return new Response(
        JSON.stringify({
          error: 'AI Service Error',
          message: 'OpenAI API request failed. Check your API key.',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
