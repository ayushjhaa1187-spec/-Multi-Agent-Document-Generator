import { prisma } from '../lib/prisma';
import fs from 'fs';
import { SourceType } from '@prisma/client';
import { processDocument } from '../lib/processing/processor';

async function main() {
  const projectName = 'AMI Analysis Project';
  const filePath = './datasets/ami_sample.txt';

  console.log(`Ingesting AMI data from ${filePath}...`);

  // Ensure project exists
  const project = await prisma.project.upsert({
    where: { name: projectName },
    create: { name: projectName },
    update: {}
  });

  const content = fs.readFileSync(filePath, 'utf-8');

  // Assuming simpler format: create one document for the whole transcript
  // In reality, AMI corpus is XML with speaker diarization.
  // For this demo, we treat the text file as a single "Transcript Document".

  const doc = await prisma.sourceDocument.create({
    data: {
      projectId: project.id,
      type: SourceType.TRANSCRIPT,
      content: content,
      metadata: {
        source: 'AMI Meeting Corpus',
        filename: 'ami_sample.txt'
      },
      isRelevant: false
    }
  });

  console.log(`Created document ${doc.id}`);

  try {
      await processDocument(doc.id);
  } catch (e: any) {
      console.log(`Processing failed (expected without API key): ${e.message}`);
  }

  console.log('Ingestion complete.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
