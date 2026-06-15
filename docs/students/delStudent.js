export default {
  delete: {
    tags: ['Student'],
    description: 'Delete a student',
    operationId: 'deleteStudent',
    summary: 'Delete a student',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'The id of the student to delete',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      '201': {
        description: 'Student deleted',
      },
      '500': {
        description: 'Student not found',
        schema: {
          $ref: '#/components/schemas/Error',
        },
      },
    },
  },
};
