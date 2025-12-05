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
