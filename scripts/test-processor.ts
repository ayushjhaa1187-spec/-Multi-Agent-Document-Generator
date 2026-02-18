import { processDocument } from '../lib/processing/processor';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('Creating test project and document...');
  const project = await prisma.project.create({
    data: { name: 'Test Processing Project ' + Date.now() }
  });

  const doc = await prisma.sourceDocument.create({
    data: {
      projectId: project.id,
      type: 'EMAIL',
      content: 'This is a test email regarding the new login feature deadline.',
    }
  });

  console.log('Mocking AI service...');
  const mockAiService = {
    generateObject: async () => {
      return {
        object: {
          isRelevant: true,
          relevanceScore: 0.9,
          summary: 'Discusses login feature deadline.',
          entities: [
            { type: 'TIMELINE', value: 'deadline', context: 'login feature' }
          ]
        }
      };
    }
  };

  console.log('Processing document...');
  // @ts-ignore - Ignoring type check for mock
  const result = await processDocument(doc.id, mockAiService);
  console.log('Processing result:', result);

  const updatedDoc = await prisma.sourceDocument.findUnique({
    where: { id: doc.id },
    include: { extractedEntities: true }
  });

  console.log('Updated Document Summary:', updatedDoc?.processedSummary);
  console.log('Extracted Entities:', updatedDoc?.extractedEntities);

  if (updatedDoc?.processedSummary === 'Discusses login feature deadline.') {
    console.log('SUCCESS: Document processed correctly.');
  } else {
    console.error('FAILURE: Document not updated correctly.');
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
