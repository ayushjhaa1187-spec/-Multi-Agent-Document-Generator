import { describe, it } from 'node:test';
import assert from 'node:assert';
import { shouldClarify } from './clarification';

describe('shouldClarify', () => {
  it('should return false when stage is generate', () => {
    assert.strictEqual(shouldClarify('generate', 'could you clarify?'), false);
  });

  it('should return true when stage is not generate and text asks for clarification with "could"', () => {
    assert.strictEqual(shouldClarify('planner', 'could you elaborate?'), true);
  });

  it('should return true when stage is not generate and text asks for clarification with "would"', () => {
    assert.strictEqual(shouldClarify('planner', 'would you explain?'), true);
  });

  it('should return true when stage is not generate and text contains "please clarify"', () => {
    assert.strictEqual(shouldClarify('planner', 'please clarify this point?'), true);
  });

  it('should return true when stage is not generate and a line ends with "?"', () => {
    assert.strictEqual(shouldClarify('planner', 'Some text.\nAny questions?'), true);
  });

  it('should return false when text contains "?" but no keywords and no line ends with "?"', () => {
    assert.strictEqual(shouldClarify('planner', 'Is this correct? I think so.'), false);
  });

  it('should return false when text has no "?"', () => {
    assert.strictEqual(shouldClarify('planner', 'No questions here.'), false);
  });
});
