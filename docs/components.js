export default {
  components: {
    schemas: {
      id: {
        type: 'string',
        description: 'An id of a user',
        example: '1234',
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User identification number',
            example: '12345',
          },
          name: {
            type: 'string',
            description: "User's name",
            example: 'Lorry James',
          },
          email: {
            type: 'string',
            description: "User's email",
            example: 'lorry@mail.com',
          },
          password: {
            type: 'string',
            description: "User's password",
            example: 'adm@adm',
          },
        },
      },
      Login: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: "User's email",
            example: 'email@email.com',
          },
          password: {
            type: 'string',
            description: "User's password",
            example: 'password12345',
          },
        },
      },
      Register: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: "User's name",
            example: 'nameUnDeuxTrois',
          },
          email: {
            type: 'string',
            description: "User's email",
            example: 'email@email.com',
          },
          password: {
            type: 'string',
            description: "User's password",
            example: 'password12345',
          },
        },
      },
      UserInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: "User's name",
            example: 'Lorry James',
          },
          email: {
            type: 'string',
            description: "User's email",
            example: 'lorry@mail.com',
          },
        },
      },
      AddStudent: {
        type: 'object',
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
      AddEvaluation: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the evaluation',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
            example: 'User Not found',
          },
          internal_code: {
            type: 'string',
            description: 'Error internal code',
            example: 'Invalid parameters',
          },
        },
      },
    },
  },
};
