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
