// Mock ENV first
process.env.API_SECRET_KEY = 'test-secret';
process.env.DATABASE_URL = 'postgres://mock';
process.env.OPENAI_API_KEY = 'mock';

async function main() {
  // Dynamic import to ensure ENV is loaded after process.env is set
  const { POST } = await import('../app/api/chat/route.ts');

  function createRequest(headers: Record<string, string>, body: any) {
    return new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
  }

  console.log('Running Security Verification Tests...');

  // Test 1: No API Key
  console.log('\nTest 1: Request without API Key');
  try {
    const req = createRequest({}, { messages: [] });
    const res = await POST(req);
    console.log(`Status: ${res.status}`);
    if (res.status === 401) {
      console.log('PASS: Correctly rejected.');
    } else {
      console.error('FAIL: Should have been rejected.');
      process.exit(1);
    }
  } catch (e) {
    console.error('Test 1 Exception:', e);
  }

  // Test 2: Wrong API Key
  console.log('\nTest 2: Request with Wrong API Key');
  try {
    const req = createRequest({ 'x-api-key': 'wrong-key' }, { messages: [] });
    const res = await POST(req);
    console.log(`Status: ${res.status}`);
    if (res.status === 401) {
      console.log('PASS: Correctly rejected.');
    } else {
      console.error('FAIL: Should have been rejected.');
      process.exit(1);
    }
  } catch (e) {
    console.error('Test 2 Exception:', e);
  }

  // Test 3: Correct API Key
  console.log('\nTest 3: Request with Correct API Key');
  try {
    const req = createRequest({ 'x-api-key': 'test-secret' }, { messages: [], projectName: 'Test', stage: 'clarify' });
    const res = await POST(req);
    console.log(`Status: ${res.status}`);
    if (res.status !== 401) {
      console.log('PASS: Authentication successful (proceeded to logic).');
    } else {
      console.error('FAIL: Should have been accepted.');
      process.exit(1);
    }
  } catch (e) {
    console.error('Test 3 Exception:', e);
  }
}

main().catch(console.error);
