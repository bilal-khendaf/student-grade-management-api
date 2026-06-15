export default {
  post: {
    tags: ['Users'],
    summary: 'Login',
    description: '',
    operationId: 'signIn',
    parameters: [
      {
        in: 'body',
        name: 'body',
        description: 'Connect to the database',
        required: true,
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'Email',
            example: 'email@email.com',
          },
          password: {
            type: 'string',
            description: 'Password',
            example: 'password12345',
          },
        },
        schema: {
          $ref: '#/components/schemas/Login',
        },
      },
    ],
    responses: {
      200: {
        description: 'User logged in',
        schema: {
          $ref: '#/components/schemas/Login',
        },
      },
    },
  },
};
