module.exports = {
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  schemas: {
    posts: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'post identification number',
          example: '6299d8ed4b1abe65d890c6cb',
        },
        title: {
          type: 'string',
          description: 'post title',
          example: 'Dragon Ball Z Ultimate 2.0',
        },
        body: {
          type: 'string',
          description: "post's body",
          example: 'Goku vuelve y se va del planeta Namek',
        },
        avatar: {
          type: 'string',
          description: 'image post',
          example: '005.gif',
        },
        likes: [
          {
            type: 'objectId',
            description: 'identification like on the post',
            example: '6298c8a8b0fbbd6d9844dead',
          },
        ],
        userId: {
          type: 'objectId',
          description: "user's identification who made the post ",
          example: '6201064b0028de7866e2b2c4',
        },
        commentId: {
          type: 'objectId',
          description: 'Id comment',
          example: '6201064b0028de7866e2b2c5',
        },
      },
    },
    createPost: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: "Post's title",
          example: 'My first title',
        },
        body: {
          type: 'string',
          description: "Post's body",
          example: 'Talking about the first post',
        },
        imagePost: {
          type: 'string',
          description: "post's picture",
          example: '04.png',
        },
      },
    },
  },
};
