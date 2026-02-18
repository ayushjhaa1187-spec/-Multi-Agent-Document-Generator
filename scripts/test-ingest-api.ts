import { POST } from '../app/api/ingest/route';
import { prisma } from '../lib/prisma';

// Mock Request object
class MockRequest {
  constructor(public body: any) {}
  async json() { return this.body; }
}

async function main() {
  console.log('Creating test project...');
  const project = await prisma.project.create({
    data: { name: 'Test Ingestion Project ' + Date.now() }
  });

  console.log('Testing Ingestion API...');
  const req = new MockRequest({
    projectId: project.id,
    documents: [
      { type: 'EMAIL', content: 'Email 1 content' },
      { type: 'TRANSCRIPT', content: 'Transcript 1 content' }
    ]
  });

  // Call the handler directly
  // @ts-ignore
  const response = await POST(req);

  // NextResponse.json returns a Response object. We need to parse it.
  // Wait, NextResponse.json() returns a strictly typed NextResponse, which extends Response.
  const data = await response.json();

  console.log('API Response:', data);

  if (data.success && data.count === 2) {
    console.log('SUCCESS: Ingestion API worked.');
  } else {
    console.error('FAILURE: API response incorrect.');
    process.exit(1);
  }

  // Check DB
  const docs = await prisma.sourceDocument.findMany({
    where: { projectId: project.id }
  });
  console.log('Docs in DB:', docs.length);

  if (docs.length === 2) {
    console.log('SUCCESS: Documents saved to DB.');
  } else {
    console.error('FAILURE: Documents not saved.');
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
