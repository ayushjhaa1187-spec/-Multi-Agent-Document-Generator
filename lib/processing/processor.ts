import { generateObject as realGenerateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { SourceDocument, Project } from '@prisma/client';

export const processDocument = async (docId: string, aiService = { generateObject: realGenerateObject }) => {
  const doc = await prisma.sourceDocument.findUnique({
    where: { id: docId },
    include: { project: true }
  });

  if (!doc) throw new Error('Document not found');

  const { object } = await aiService.generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      isRelevant: z.boolean(),
      relevanceScore: z.number().min(0).max(1),
      summary: z.string().describe("A concise summary of the key points relevant to the project. If not relevant, explain why."),
      entities: z.array(z.object({
        type: z.enum(['STAKEHOLDER', 'DECISION', 'TIMELINE', 'FEATURE']),
        value: z.string(),
        context: z.string().optional()
      })).optional().default([])
    }),
    prompt: `Analyze the following ${doc.type} for the project "${doc.project.name}".

    Content:
    ${doc.content}

    Determine if it is relevant to the project requirements. Extract key entities (Stakeholders, Decisions, Timelines, Features) and summarize.
    A message is irrelevant if it's purely personal, unrelated to the project (e.g. lunch plans, spam), or too vague.`
  });

  // Update DB
  await prisma.sourceDocument.update({
    where: { id: docId },
    data: {
      isRelevant: object.isRelevant,
      relevanceScore: object.relevanceScore,
      processedSummary: object.summary,
      extractedEntities: {
        create: object.entities.map(e => ({
          type: e.type,
          value: e.value,
          context: e.context || ''
        }))
      }
    }
  });

  return object;
};
