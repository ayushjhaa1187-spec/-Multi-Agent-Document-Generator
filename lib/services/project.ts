import { prisma } from '@/lib/prisma';
import { randomUUID } from 'node:crypto';

interface Message {
  role: string;
  content: string;
}

export async function saveBRD(
  text: string,
  projectName: string,
  messages: Message[]
): Promise<{ projectId: string; version: number } | null> {
  if (!text || text.trim().length === 0) {
    console.warn('Empty text received from AI model');
    return null;
  }

  try {
    let savedProjectId: string | null = null;
    let savedVersion: number | null = null;

    await prisma.$transaction(
      async (tx) => {
        // Fix Race Condition: Use atomic upsert on unique name field
        const project = await tx.project.upsert({
          where: { name: projectName.trim() },
          create: {
            id: randomUUID(),
            name: projectName.trim(),
            description: messages[0]?.content || '',
          },
          update: { updatedAt: new Date() },
        });

        const maxVersion = await tx.bRD.aggregate({
          where: { projectId: project.id },
          _max: { version: true },
        });

        const nextVersion = (maxVersion._max.version || 0) + 1;

        await tx.bRD.create({
          data: {
            projectId: project.id,
            version: nextVersion,
            content: {
              raw: text,
              generatedAt: new Date().toISOString(),
              model: 'gpt-4o',
            },
            rawInput: messages[messages.length - 1]?.content || '',
            status: 'draft',
          },
        });

        savedProjectId = project.id;
        savedVersion = nextVersion;
      },
      { isolationLevel: 'Serializable' }
    );

    if (savedProjectId && savedVersion) {
      console.log(`BRD saved: Project ${savedProjectId}, Version ${savedVersion}`);
      return { projectId: savedProjectId, version: savedVersion };
    }
  } catch (error) {
    console.error('Database save error:', error);
  }
  return null;
}
