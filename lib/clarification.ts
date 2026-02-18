export function shouldClarify(stage: string, plannerText: string): boolean {
  return (
    stage !== 'generate' &&
    (plannerText.includes('?') &&
      (plannerText.toLowerCase().includes('could') ||
        plannerText.toLowerCase().includes('would') ||
        plannerText.toLowerCase().includes('please clarify') ||
        plannerText.split('\n').some((line) => line.trim().endsWith('?'))))
  );
}
