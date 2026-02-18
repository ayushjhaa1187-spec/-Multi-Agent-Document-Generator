import { PrismaClient, SourceType } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function loadAmiTranscripts() {
  const datasetDir = './datasets/ami';
  const sampleFile = './datasets/ami_sample.txt';

  let files: string[] = [];

  if (fs.existsSync(datasetDir) && fs.lstatSync(datasetDir).isDirectory()) {
    files = fs.readdirSync(datasetDir)
      .filter(file => file.endsWith('.txt'))
      .map(file => path.join(datasetDir, file));
  } else if (fs.existsSync(sampleFile)) {
    console.log(`⚠️  AMI dataset directory not found at ${datasetDir}. Using sample file.`);
    files = [sampleFile];
  } else {
    console.error('❌ AMI dataset not found (checked ./datasets/ami/ and ./datasets/ami_sample.txt).');
    return;
  }

  const projectName = 'AMI Analysis Project';
  const existingProject = await prisma.project.findUnique({ where: { name: projectName } });
  let projectId = existingProject?.id;

  if (!projectId) {
     const newProject = await prisma.project.create({
        data: { name: projectName, description: 'Analysis of AMI Meeting Corpus' }
     });
     projectId = newProject.id;
  }

  console.log(`Found ${files.length} transcript files.`);

  const documents: any[] = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const filename = path.basename(file);

    documents.push({
      projectId: projectId,
      type: SourceType.TRANSCRIPT,
      content: content,
      metadata: {
        source: 'AMI Meeting Corpus',
        filename: filename
      },
      relevanceScore: 0,
      isRelevant: false,
      processedSummary: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  // Insert in batches
  let loadedCount = 0;
  for (let i = 0; i < documents.length; i += 100) {
    const batch = documents.slice(i, i + 100);
    await prisma.sourceDocument.createMany({
      data: batch,
      skipDuplicates: true
    });
    loadedCount += batch.length;
    console.log(`✓ Loaded ${loadedCount}/${documents.length}`);
  }

  console.log('✅ AMI transcripts loaded successfully!');
  await prisma.$disconnect();
}

loadAmiTranscripts().catch(console.error);
