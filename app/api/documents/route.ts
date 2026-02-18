import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectName = searchParams.get('projectName');

  if (!projectName) {
    return NextResponse.json({ error: 'Project Name required' }, { status: 400 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { name: projectName },
      include: {
        sourceDocuments: {
          orderBy: { createdAt: 'desc' },
          include: { extractedEntities: true }
        }
      }
    });

    if (!project) {
      return NextResponse.json({ documents: [] });
    }

    return NextResponse.json({ documents: project.sourceDocuments });
  } catch (error) {
    console.error('Fetch documents error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
