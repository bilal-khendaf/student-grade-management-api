export default {
  post: {
    tags: ['Users'],
    summary: 'Register',
    description: '',
    operationId: 'signUp',
    parameters: [
      {
        in: 'body',
        name: 'body',
        description: 'Add a user to the DB',
        required: true,
        schema: {
          $ref: '#/components/schemas/Register',
        },
      },
    ],
    responses: {
      201: {
        description: 'User created',
        schema: {
          $ref: '#/components/schemas/Register',
        },
      },
    },
  },
};
