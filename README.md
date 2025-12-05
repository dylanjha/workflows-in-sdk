Testing out running Workflow Dev Kit

## Project Structure

- `nextjs-app` -- Next.js application with `workflow` installed
- `sdk-with-workflows` -- Local SDK package that exports `workflowTwo()` function

## Setup

1. Build the SDK package:
```bash
cd sdk-with-workflows
npm run build
```

2. Install dependencies in the Next.js app (the SDK is linked as a local dependency):
```bash
cd nextjs-app
npm install
```

## Run the workflow dev kit observability dashboard:

```bash
npx workflow inspect runs --web
```

## Debugging

### Trigger workflowOne

This endpoint calls `workflowOne` as a workflow using the Workflow Dev Kit:

```bash
curl -X POST --json '{"input":"my workflow input"}' http://localhost:3000/api/do-something-1
```

This workflow runs successfully, and the code for workflowOne lives in the project in `app/workflows/`.

### Trigger workflowTwo

This endpoint calls `workflowTwo()` the same way

```bash
curl -X POST --json '{"input":"my workflow input"}' http://localhost:3000/api/do-something-2
```

This workflow fails with an error like:

```
 ✓ Ready in 438ms
Error [WorkflowRuntimeError]: 'start' received an invalid workflow function. Ensure the Workflow Development Kit is configured correctly and the function includes a 'use workflow' directive.

Learn more: https://useworkflow.dev/err/start-invalid-workflow-function
    at POST (app/api/do-something-2/route.ts:7:26)
   5 | export async function POST(request: Request) {
   6 |   const { input } = await request.json();
>  7 |   const run = await start(workflowTwo, [input]);
     |                          ^
   8 |
   9 |   return NextResponse.json(run);
  10 | } {
  cause: undefined
}
```

If we dig into the `node_modules/sdk-with-workflows/dist/index.mjs` we can see the directives are there in the build:

```
❯ cat node_modules/sdk-with-workflows/dist/index.mjs
// src/index.ts async function workflowTwo(input) {
  "use workflow";
  const outputOne = await stepOne(input);
  const outputTwo = await stepTwo(outputOne);
  return { output: outputTwo };
}
async function stepOne(input) {
  "use step";
  return new Promise((resolve) => {
    setTimeout(() => resolve(`one ${input}`), 10);
  });
}
async function stepTwo(outputOne) {
  "use step";
  return new Promise((resolve) => {
    setTimeout(() => resolve(`two: ${outputOne}`), 10);
  });
}
export {
  workflowTwo
};
//# sourceMappingURL=index.mjs.map
```

