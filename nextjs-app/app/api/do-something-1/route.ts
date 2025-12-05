import { start } from 'workflow/api';
import { NextResponse } from "next/server";
import { workflowOne } from "../../workflows/workflow-one";

export async function POST(request: Request) {
  const { input } = await request.json();
  const run = await start(workflowOne, [input]);

  return NextResponse.json({ run });
}
