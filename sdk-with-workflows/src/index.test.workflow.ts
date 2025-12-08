import { describe, it, expect } from 'vitest';
import { start } from 'workflow/api';
import { workflowTwo } from './index';

describe('call in workflow context', () => {
  it('should execute workflow and return expected output', async () => {
    const run = await start(workflowTwo, ['input-test']);

    // Check the run object is created
    expect(run).toBeDefined();
    expect(run.runId).toBeDefined();
    expect(run.runId).toMatch(/^wrun_/);

    // Now we can await the actual result since Nitro server is processing workflows
    const returnValue = await run.returnValue;

    expect(returnValue).toEqual({
      output: 'two: one input-test'
    });
  });
});
