import { PrismaClient, SourceType } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

const prisma = new PrismaClient();

async function loadEnronEmails() {
  let filePath = './datasets/enron.csv';

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Enron dataset not found at ${filePath}. Checking for sample...`);
    filePath = './datasets/enron_sample.csv';
    if (!fs.existsSync(filePath)) {
       console.error('❌ Sample Enron dataset not found either. Please add datasets/enron_sample.csv or full dataset.');
       return;
    }
  }

  console.log(`Found dataset at ${filePath}`);

  // Ensure project exists
  const projectName = 'Enron Analysis Project';
  const existingProject = await prisma.project.findUnique({ where: { name: projectName } });
  let projectId = existingProject?.id;

  if (!projectId) {
     const newProject = await prisma.project.create({
        data: { name: projectName, description: 'Analysis of Enron email corpus' }
     });
     projectId = newProject.id;
  }

  const batchSize = 1000;
  let batch: any[] = [];
  let totalLoaded = 0;

  console.log('Reading emails...');

  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const row of stream) {
      // Map CSV to SourceDocument structure
      const content = `Subject: ${row.Subject}\nFrom: ${row.From}\nTo: ${row.To}\n\n${row.Content}`;

      batch.push({
        projectId: projectId,
        type: SourceType.EMAIL,
        content: content,
        metadata: {
          subject: row.Subject,
          sender: row.From,
          recipient: row.To,
          date: row.Date
        },
        relevanceScore: 0,
        isRelevant: false,
        processedSummary: null,
        createdAt: row.Date ? new Date(row.Date) : new Date(),
        updatedAt: new Date()
      });

      if (batch.length >= batchSize) {
          await prisma.sourceDocument.createMany({
              data: batch,
              skipDuplicates: true,
          });
          totalLoaded += batch.length;
          console.log(`✓ Loaded ${totalLoaded} (batch)`);
          batch = [];
      }
  }

  // Insert remaining
  if (batch.length > 0) {
      await prisma.sourceDocument.createMany({
          data: batch,
          skipDuplicates: true,
      });
      totalLoaded += batch.length;
      console.log(`✓ Loaded ${totalLoaded} (final batch)`);
  }

  console.log('✅ Enron emails loaded successfully!');
  await prisma.$disconnect();
}

loadEnronEmails().catch(console.error);
