import { start } from 'workflow/api';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { input } = await request.json();
  // const run = await start(workflowOne, [input]);

  // return NextResponse.json(run);
  return NextResponse.json({ input });
}


export async function workflowOne(input: string) {
  'use workflow';

  const outputOne = await stepOne(input);
  const outputTwo = await stepTwo(outputOne as string);
 

  return { output: outputTwo };
}

async function stepOne (input: string) {
  'use step';

  return new Promise((resolve) => {
    setTimeout(() => resolve(`one ${input}`), 10);
  });
}

async function stepTwo (outputOne: string) {
  'use step';

  return new Promise((resolve) => {
    setTimeout(() => resolve(`two: ${outputOne}`), 10);
  });
}
