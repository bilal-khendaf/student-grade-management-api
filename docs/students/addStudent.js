export default {
  post: {
    tags: ['Student'],
    summary: 'Add student',
    description: 'Add a new student',
    operationId: 'addStudent',
    parameters: [
      {
        in: 'body',
        name: 'Student',
        description: 'Student to add',
        required: true,
        schema: {
          type: 'object',
          $ref: '#/components/schemas/AddStudent',
        },
        properties: {
          email: {
            type: 'string',
            description: 'Email of the student',
            example: 'email@email.com',
          },
          firstName: {
            type: 'string',
            description: 'First name of the student',
            example: 'John',
          },
          lastName: {
            type: 'string',
            description: 'Last name of the student',
            example: 'Doe',
          },
        },
      },
    ],
    responses: {
      '201': {
        description: 'Student added',
        schema: {
          type: 'object',
          $ref: '#/components/schemas/AddStudent',
        },
      },
      '400': {
        description: 'Bad request',
        schema: {
          $ref: '#/components/schemas/Error',
        },
      },
      '500': {
        description: 'Internal server error',
        schema: {
          $ref: '#/components/schemas/Error',
        },
      },
    },
  },
};
