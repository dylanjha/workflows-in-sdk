/*
 *  Repo case for https://github.com/vercel/workflow/pull/542
 * */

import { start } from 'workflow/api';
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

async function workflowFour(input: string) {
  'use workflow';

  const result = await stepOne(`input ${input}`);

  return { output: `workflow one ${result}` };
}

async function stepOne(input: string) {
  'use step';

  console.log('GetObjectCommand', GetObjectCommand);
  console.log('S3Client', S3Client);

  return `step one ${input}`;
}

export async function POST(request: Request) {
  const { input } = await request.json();
  const run = await start(workflowFour, [input]);
  return new Response(run.runId);
}
