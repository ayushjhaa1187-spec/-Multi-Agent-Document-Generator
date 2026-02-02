import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { prisma } from '@/lib/prisma';
import { BRD_PLANNER_SYSTEM_PROMPT } from '@/lib/agents/brd-planner';
import { REQUIREMENT_WRITER_SYSTEM_PROMPT } from '@/lib/agents/requirement-writer';


export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, projectName, stage } = await req.json();

    // Stage 1: BRD Planner Agent
    const plannerResult = await streamText({
      model: openai('gpt-4o'),
      system: BRD_PLANNER_SYSTEM_PROMPT,
      messages,
    });

    const plannerText = await plannerResult.text;

    // Check if clarification needed
    const needsClarification =
      stage !== 'generate' &&
      /\?\s*$/.test(plannerText.trim().split('\n').slice(-1)[0] || '');

    if (needsClarification) {
      return plannerResult.toDataStreamResponse();
    }

    // Stage 2: Requirement Writer Agent
    const writerResult = streamText({
      model: openai('gpt-4o'),
      system: REQUIREMENT_WRITER_SYSTEM_PROMPT,
      messages: [
        ...messages,
        { role: 'assistant', content: plannerText },
      ],
      onFinish: async ({ text }) => {
        try {
          // Find existing project by name or create with new ID
    const existingProject = await prisma.project.findFirst({
      where: { name: projectName || 'Untitled Project' }
    });
    
    const projectId = existingProject?.id || crypto.randomUUID();
    
    const project = await prisma.project.upsert({
      where: { id: projectId },
      create: { id: projectId, name: projectName || 'Untitled Project' },
      update: {}
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
              content: { raw: text },
              rawInput: messages[messages.length - 1]?.content || '',
              status: 'draft',
            },
          });
        } catch (error) {
          console.error('Database save error:', error);
        }
      },
    });

    return writerResult.toDataStreamResponse();
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
