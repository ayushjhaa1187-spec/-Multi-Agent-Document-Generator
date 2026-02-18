import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SourceType } from '@prisma/client';
import { processDocument } from '@/lib/processing/processor';
import csv from 'csv-parser';
import { Readable } from 'stream';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;
    const projectName = formData.get('projectName') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    let finalProjectId = projectId;

    if (!finalProjectId && projectName) {
       const project = await prisma.project.upsert({
        where: { name: projectName },
        create: { name: projectName },
        update: {}
      });
      finalProjectId = project.id;
    }

    if (!finalProjectId) {
        return NextResponse.json({ error: 'Project ID or Name required' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileType = file.name.endsWith('.csv') ? 'CSV' : 'TEXT';

    let count = 0;

    if (fileType === 'CSV') {
       // Parse CSV
       const stream = Readable.from(buffer.toString());
       const results: any[] = [];

       await new Promise((resolve, reject) => {
         stream
            .pipe(csv())
            .on('data', (data: any) => results.push(data))
            .on('end', resolve)
            .on('error', reject);
       });

       for (const row of results) {
         // Assume Enron format or Generic
         const subject = row.Subject || row.subject || 'No Subject';
         const from = row.From || row.from || 'Unknown';
         const to = row.To || row.to || 'Unknown';
         const contentBody = row.Content || row.content || row.Body || '';

         const content = `Subject: ${subject}\nFrom: ${from}\nTo: ${to}\n\n${contentBody}`;

         const doc = await prisma.sourceDocument.create({
            data: {
                projectId: finalProjectId,
                type: SourceType.EMAIL,
                content: content,
                metadata: { filename: file.name, ...row },
                isRelevant: false
            }
         });

         // Fire and forget processing
         processDocument(doc.id).catch(e => console.error(e));
         count++;
       }

    } else {
       // Treat as Transcript/Text
       const content = buffer.toString('utf-8');
       const doc = await prisma.sourceDocument.create({
            data: {
                projectId: finalProjectId,
                type: SourceType.TRANSCRIPT,
                content: content,
                metadata: { filename: file.name },
                isRelevant: false
            }
       });
       processDocument(doc.id).catch(e => console.error(e));
       count = 1;
    }

    return NextResponse.json({ success: true, count });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
