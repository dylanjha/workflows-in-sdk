import { describe, it, expect } from 'vitest';
import { start } = from 'workflow/api';
import { workflowTwo } from './index';

describe('call in workflow context', () => {
  it('should create a workflow run when calling via start()', async () => {
    const run = await start(workflowTwo, ['input-test']);

    // Check the run object is created
    expect(run).toBeDefined();
    expect(run.runId).toBeDefined();
    expect(run.runId).toMatch(/^wrun_/);

    // Note: We don't await run.returnValue here because that would require
    // a workflow worker to be running. This test just verifies the workflow
    // can be queued successfully.
  });
});
