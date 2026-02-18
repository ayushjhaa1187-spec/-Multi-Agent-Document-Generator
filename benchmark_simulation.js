const simulateDbCall = (duration) => new Promise(resolve => setTimeout(resolve, duration));

async function scenarioOriginal() {
  const start = performance.now();
  // Simulate findFirst
  await simulateDbCall(50);
  // Simulate logic
  // Simulate upsert
  await simulateDbCall(50);
  const end = performance.now();
  return end - start;
}

async function scenarioOptimized() {
  const start = performance.now();
  // Simulate upsert (single call)
  await simulateDbCall(50);
  const end = performance.now();
  return end - start;
}

async function runBenchmark() {
  console.log('Running benchmark simulation...');
  const iterations = 10;
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (let i = 0; i < iterations; i++) {
    totalOriginal += await scenarioOriginal();
    totalOptimized += await scenarioOptimized();
  }

  const avgOriginal = totalOriginal / iterations;
  const avgOptimized = totalOptimized / iterations;

  console.log(`Original (avg of ${iterations} runs): ${avgOriginal.toFixed(2)}ms`);
  console.log(`Optimized (avg of ${iterations} runs): ${avgOptimized.toFixed(2)}ms`);
  console.log(`Improvement: ${((avgOriginal - avgOptimized) / avgOriginal * 100).toFixed(2)}%`);
}

runBenchmark();
