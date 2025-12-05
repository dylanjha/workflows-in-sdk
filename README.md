Testing out running Workflow Dev Kit

`nextjs-app` -- this is a nextjs application with `workflow` installed

- Trigger a workflow with:

```
curl -X POST --json '{"input":"my workflow input"}' http://localhost:3000/api/do-something-1
```

- Run the workflow dev kit observability dashboard:

```
npx workflow inspect runs --web
```
