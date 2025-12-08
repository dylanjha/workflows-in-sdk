import { describe, it, expect } from 'vitest';
import { workflowTwo } from './index';

describe('call workflow function in-line', () => {
  it('should return expected output when calling workflowTwo directly', async () => {
    const result = await workflowTwo('input-test');

    expect(result).toEqual({
      output: 'two: one input-test'
    });
  });
});

describe('call in workflow context', () => {
  it('should return expected output when calling via start()', async () => {
    const { start } = await import('workflow/api');
    const run = await start(workflowTwo, ['input-test']);

    // Check the run object
    expect(run).toBeDefined();
    expect(run.runId).toBeDefined();

    // Check the return value
    const returnValue = await run.returnValue;
    expect(returnValue).toEqual({
      output: 'two: one input-test'
    });
  });
});
