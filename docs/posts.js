module.exports = {
  paths: {
    '/posts': {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Posts: 'Get all posts',
        },
        summary: 'Get all posts',
        description: 'Get posts',
        operationId: 'getAll',
        parameters: [],
        responses: {
          200: {
            description: 'Posts were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/posts',
                },
              },
            },
          },
        },
      },
    },
  },
};
