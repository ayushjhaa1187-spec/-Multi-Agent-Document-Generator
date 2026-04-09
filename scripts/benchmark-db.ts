
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function benchmark() {
  console.log('Starting benchmark...');

  // Warmup
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (e) {
    console.error('Database connection failed:', e);
    process.exit(1);
  }

  const iterations = 100;
  let totalTime = 0;

  for (let i = 0; i < iterations; i++) {
    const start = process.hrtime.bigint();
    await prisma.$queryRaw`SELECT 1`;
    const end = process.hrtime.bigint();
    totalTime += Number(end - start);
  }

  const avgTime = totalTime / iterations / 1e6; // in ms
  console.log(`Average "SELECT 1" latency over ${iterations} iterations: ${avgTime.toFixed(2)}ms`);

  await prisma.$disconnect();
}

benchmark();
