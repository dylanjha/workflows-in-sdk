import { start } from 'workflow/api';
import { NextResponse } from "next/server";
import { workflowTwo } from "sdk-with-workflows";

export async function POST(request: Request) {
  const { input } = await request.json();
  const run = await start(workflowTwo, [input]);

  return NextResponse.json(run);
}
