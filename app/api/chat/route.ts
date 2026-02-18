import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { prisma } from '@/lib/prisma';
import { getBrdPlannerSystemPrompt } from '@/lib/agents/brd-planner';
import { REQUIREMENT_WRITER_SYSTEM_PROMPT } from '@/lib/agents/requirement-writer';

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

    // Fetch RELEVANT context from ingested documents
    let context = '';
    const project = await prisma.project.findUnique({
      where: { name: projectName },
      include: {
        sourceDocuments: {
          where: {
            isRelevant: true,
            relevanceScore: { gte: 0.5 } // Threshold filtering
          },
          orderBy: { relevanceScore: 'desc' },
          take: 20, // Limit context window
          include: { extractedEntities: true }
        }
      }
    });

    if (project && project.sourceDocuments.length > 0) {
      context = project.sourceDocuments.map(d =>
        `[${d.type}] (Relevance: ${d.relevanceScore}) Summary: ${d.processedSummary || d.content.substring(0, 200)}...
         Entities: ${d.extractedEntities.map(e => `${e.type}: ${e.value}`).join(', ')}`
      ).join('\n\n');

      console.log(`Using context from ${project.sourceDocuments.length} documents.`);
    }

    const plannerResult = await streamText({
      model: openai('gpt-4o'),
      system: getBrdPlannerSystemPrompt(context),
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

          // Fix for ReferenceError: check project or fetch existing
          let projectId = project?.id;

          if (!projectId) {
             const existingProject = await prisma.project.findUnique({
                where: { name: projectName }
             });

             if (existingProject) {
                 projectId = existingProject.id;
             } else {
                 const newProject = await prisma.project.create({
                    data: {
                        name: projectName,
                        description: messages[0]?.content || '',
                    }
                 });
                 projectId = newProject.id;
             }
          }

          const maxVersion = await prisma.bRD.findFirst({
            where: { projectId: projectId },
            orderBy: { version: 'desc' },
            select: { version: true }, // Select only version to be efficient
          });

          await prisma.bRD.create({
            data: {
              projectId: projectId,
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
            `✓ BRD saved: Project ${projectId}, Version ${(maxVersion?.version || 0) + 1}`
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
