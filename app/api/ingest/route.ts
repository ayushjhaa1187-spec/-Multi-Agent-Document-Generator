import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processDocument } from '@/lib/processing/processor';
import { SourceType } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { projectId, projectName, documents } = body;

    if ((!projectId && !projectName) || !documents || !Array.isArray(documents)) {
      return NextResponse.json({ error: 'Invalid payload. Expected { projectId OR projectName, documents: [] }' }, { status: 400 });
    }

    if (!projectId && projectName) {
      // Find or create project
      const project = await prisma.project.upsert({
        where: { name: projectName },
        create: { name: projectName },
        update: {}
      });
      projectId = project.id;
    }

    const results = [];

    for (const doc of documents) {
      if (!doc.content || !doc.type) {
        console.warn('Skipping invalid document:', doc);
        continue;
      }

      const created = await prisma.sourceDocument.create({
        data: {
          projectId,
          type: doc.type as SourceType,
          content: doc.content,
          metadata: doc.metadata || {},
          isRelevant: false // Default, will be updated by processor
        }
      });

      // Trigger processing
      // In a real app, this should be a background job.
      try {
        await processDocument(created.id);
      } catch (e) {
        console.error(`Failed to process document ${created.id}:`, e);
        // We continue even if processing fails, but ideally we mark it as failed.
      }

      results.push(created.id);
    }

    return NextResponse.json({ success: true, count: results.length, ids: results });
  } catch (error) {
    console.error('Ingestion error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
