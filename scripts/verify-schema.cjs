const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const project = await prisma.project.create({
      data: {
        name: 'Test Project ' + Date.now(),
        sourceDocuments: {
          create: {
            type: 'EMAIL',
            content: 'Test content',
            isRelevant: true
          }
        }
      },
      include: {
        sourceDocuments: true
      }
    });
    console.log('Project created:', project.id);
    console.log('Source Documents:', project.sourceDocuments);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
