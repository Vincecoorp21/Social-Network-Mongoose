const mongoose = require('mongoose');

const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Por favor el Post tiene que tener un título'],
    },
    body: {
      type: String,
      required: [true, 'Por favor el Post tiene que tener un Body'],
    },
    avatar: String,
    likes: [{ type: ObjectId }],
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    commentId: [{ type: ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
