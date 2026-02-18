import { prisma } from '@/lib/prisma';

export async function saveGeneratedBRD(
  projectName: string | undefined,
  description: string | undefined,
  rawInput: string | undefined,
  generatedText: string
) {
  const existingProject = await prisma.project.findFirst({
    where: { name: projectName || 'Untitled Project' },
  });

  const projectId = existingProject?.id || crypto.randomUUID();

  const project = await prisma.project.upsert({
    where: { id: projectId },
    create: {
      id: projectId,
      name: projectName || 'Untitled Project',
      description: description || '',
    },
    update: { updatedAt: new Date() },
  });

  const maxVersion = await prisma.bRD.findFirst({
    where: { projectId: project.id },
    orderBy: { version: 'desc' },
    select: { version: true },
  });

  const version = (maxVersion?.version || 0) + 1;

  await prisma.bRD.create({
    data: {
      projectId: project.id,
      version: version,
      content: {
        raw: generatedText,
        generatedAt: new Date().toISOString(),
        model: 'gpt-4o',
      },
      rawInput: rawInput || '',
      status: 'draft',
    },
  });

  console.log(
    `✓ BRD saved: Project ${project.id}, Version ${version}`
  );

  return {
    projectId: project.id,
    version: version,
  };
}
