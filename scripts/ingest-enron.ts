import { prisma } from '../lib/prisma';
import fs from 'fs';
import csv from 'csv-parser';
import { SourceType } from '@prisma/client';
import { processDocument } from '../lib/processing/processor';

async function main() {
  const projectName = 'Enron Analysis Project';
  const filePath = './datasets/enron_sample.csv';

  console.log(`Ingesting Enron data from ${filePath}...`);

  // Ensure project exists
  const project = await prisma.project.upsert({
    where: { name: projectName },
    create: { name: projectName },
    update: {}
  });

  const results: any[] = [];

  const stream = fs.createReadStream(filePath)
    .pipe(csv());

  for await (const row of stream) {
    // CSV: Date,From,To,Subject,Content
    const content = `Subject: ${row.Subject}\nFrom: ${row.From}\nTo: ${row.To}\n\n${row.Content}`;

    const doc = await prisma.sourceDocument.create({
      data: {
        projectId: project.id,
        type: SourceType.EMAIL,
        content: content,
        metadata: {
          date: row.Date,
          sender: row.From,
          recipient: row.To,
          subject: row.Subject
        },
        isRelevant: false // Processor will update this
      }
    });

    console.log(`Created document ${doc.id}`);

    // Trigger processing
    try {
        await processDocument(doc.id);
    } catch (e: any) {
        console.log(`Processing failed (expected without API key): ${e.message}`);
    }
    results.push(doc);
  }

  console.log(`Ingested ${results.length} emails.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
