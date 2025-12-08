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

## sdk-with-workflows

This directory is an example of an SDK that exports workflows

This SDK has automated test to make sure:

- `npm run test`: test that the exported functions work in a regular node env
- `npm run test:workflow`: test that the exported functions work in a 'workflow' environment

Each of these commands use a different vitest config, the latter one spins up a nitro server to run the whole workflow harness
