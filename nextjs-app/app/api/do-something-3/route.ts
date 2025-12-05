/*
 *  Repo case for https://github.com/vercel/workflow/pull/542
 *
 *  using 'use workflow' in the same file with a next.js route that uses NextResponse
 *
 *  Errors:
 *
 *   POST /api/do-something-3 200 in 338ms (compile: 319ms, render: 19ms)
ReferenceError while running "wrun_01KBPPXHVG6DR78W5C9SN2QZMZ" workflow:

app/api/do-something-3/route.ts:4217
      if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
                                                                               ^

ReferenceError: __dirname is not defined
    at anonymous (node_modules/next/dist/compiled/ua-parser-js/ua-parser.js:2315:77)
    at node_modules/next/dist/compiled/ua-parser-js/ua-parser.js (node_modules/next/dist/compiled/ua-parser-js/ua-parser.js:2318:3)
    at __require (app/api/do-something-3/route.ts:9:50)
    at node_modules/next/dist/server/web/spec-extension/user-agent.js (app/api/do-something-3/route.ts:4249:64)
    at __require (app/api/do-something-3/route.ts:9:50)
    at node_modules/next/server.js (node_modules/next/server.js:5:25)

Removing NextResponse and using `new Response` instead solves the issue

Note that `workflowThree` IS exported. If it is NOT exported, then you'll get an undefined error:

 POST /api/do-something-3 200 in 31ms (compile: 28ms, render: 3ms)
ReferenceError while running "wrun_01KBPQ180QXHJTYHNHPC53KEMF" workflow:

ReferenceError: Workflow "workflow//app/api/do-something-3/route.ts//workflowThree" must be a function, but got "undefined" instead
 * */

import { start } from 'workflow/api';
import { NextResponse } from "next/server";

export async function workflowThree(input: string) {
  'use workflow';

  return { output: `workflow one ${input}` };
}

export async function POST(request: Request) {
  const { input } = await request.json();
  const run = await start(workflowThree, [input]);
  return NextResponse.json(run);
}
