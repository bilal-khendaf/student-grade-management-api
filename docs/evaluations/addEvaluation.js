export default {
  post: {
    tags: ['Evaluation'],
    description: 'Add a new evaluation',
    operationId: 'addEvaluation',
    summary: 'Add a new evaluation',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'The evaluation to add',
        required: true,
        schema: {
          $ref: '#/components/schemas/AddEvaluation',
        },
        properties: {
          name: {
            type: 'string',
            description: 'The name of the evaluation',
          },
        },
      },
    ],
    responses: {
      '201': {
        description: 'The evaluation was added',
        schema: {
          $ref: '#/components/schemas/AddEvaluation',
        },
      },
      '400': {
        description: 'The evaluation was not added',
        schema: {
          $ref: '#/components/schemas/Error',
        },
      },
      '500': {
        description: 'The evaluation was not added',
        schema: {
          $ref: '#/components/schemas/Error',
        },
      },
    },
  },
};
