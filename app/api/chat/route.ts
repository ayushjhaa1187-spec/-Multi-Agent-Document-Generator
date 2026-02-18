import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { prisma } from '@/lib/prisma';
import { BRD_PLANNER_SYSTEM_PROMPT } from '@/lib/agents/brd-planner';
import { REQUIREMENT_WRITER_SYSTEM_PROMPT } from '@/lib/agents/requirement-writer';
import { logError } from '@/lib/logger';

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
      logError('Database connection failed', dbError);
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

          const existingProject = await prisma.project.findFirst({
            where: { name: projectName || 'Untitled Project' },
          });

          const projectId = existingProject?.id || crypto.randomUUID();

          const project = await prisma.project.upsert({
            where: { id: projectId },
            create: {
              id: projectId,
              name: projectName || 'Untitled Project',
              description: messages[0]?.content || '',
            },
            update: { updatedAt: new Date() },
          });

          const maxVersion = await prisma.bRD.findFirst({
            where: { projectId: project.id },
            orderBy: { version: 'desc' },
            select: { version: true },
          });

          await prisma.bRD.create({
            data: {
              projectId: project.id,
              version: (maxVersion?.version || 0) + 1,
              content: {
                raw: text,
                generatedAt: new Date().toISOString(),
                model: 'gpt-4o',
              },
              rawInput: messages[messages.length - 1]?.content || '',
              status: 'draft',
            },
          });

          console.log(
            `✓ BRD saved: Project ${project.id}, Version ${(maxVersion?.version || 0) + 1}`
          );
        } catch (error) {
          logError('Database save error', error);
        }
      },
    });

    return writerResult.toDataStreamResponse();
  } catch (error) {
    logError('API error', error);

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
