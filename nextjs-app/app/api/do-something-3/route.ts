/*
 *  Repo case for https://github.com/vercel/workflow/pull/542
 * */

import { start } from 'workflow/api';

async function workflowThree(input: string) {
  'use workflow';

  return { output: `workflow one ${input}` };
}

export async function POST(request: Request) {
  const { input } = await request.json();
  const run = await start(workflowThree, [input]);
  return new Response(run.runId);
}
