import { prisma } from '../lib/prisma';
import { processDocument } from '../lib/processing/processor';
import { SourceType } from '@prisma/client';

async function main() {
  const projectName = 'Enron Analysis Project';

  console.log(`Seeding project: ${projectName}`);

  const project = await prisma.project.upsert({
    where: { name: projectName },
    create: { name: projectName },
    update: {}
  });

  const documents = [
    {
      type: 'EMAIL',
      content: `Message-ID: <12345.1075855687890.JavaMail.evans@thyme>
Date: Mon, 16 Oct 2000 09:15:00 -0700 (PDT)
From: phillip.allen@enron.com
To: keith.holst@enron.com
Subject: Consolidated positions

Keith,
Regarding the West Desk consolidation project:
We need to merge the trading positions by Q4. The risk management system needs to be updated to handle the new volume.
Can you confirm if the Oracle database migration is on track?
Thanks,
Phillip`,
      metadata: { sender: 'phillip.allen@enron.com', date: '2000-10-16' }
    },
    {
      type: 'TRANSCRIPT',
      content: `Meeting: User Interface Redesign
Participants: Sarah (UX), Mike (Dev), Jane (PM)

Jane: The client wants the dashboard to be responsive for tablets.
Sarah: That will require changing the grid layout. I can have mocks by Friday.
Mike: We are using Tailwind, so it should be straightforward.
Jane: Great. Also, we need to add a "dark mode" toggle.
Mike: That's a new requirement. It might push the timeline by 2 days.
Jane: Approved. Let's do it.`,
      metadata: { participants: ['Sarah', 'Mike', 'Jane'] }
    },
    {
       type: 'EMAIL',
       content: `Subject: Lunch?
From: John
To: Team

Anyone up for tacos today?`,
       metadata: { sender: 'John' }
    }
  ];

  for (const doc of documents) {
    console.log(`Creating ${doc.type}...`);
    const created = await prisma.sourceDocument.create({
      data: {
        projectId: project.id,
        type: doc.type as SourceType,
        content: doc.content,
        metadata: doc.metadata || {},
        isRelevant: false
      }
    });

    console.log(`Processing ${created.id}...`);
    try {
        await processDocument(created.id);
    } catch (e: any) {
        console.log('Processing failed (expected if no API key):', e.message || e);
    }
  }

  console.log('Seeding complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
