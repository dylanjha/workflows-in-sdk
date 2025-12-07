import { start } from 'workflow/api';
import { workflowTwo } from "sdk-with-workflows";

export async function POST(request: Request) {
  const { input } = await request.json();
  const run = await start(workflowTwo, [input]);

  return new Response(run.runId);
}
