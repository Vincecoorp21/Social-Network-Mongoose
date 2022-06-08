const mongoose = require('mongoose');

const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    postID: {
      type: ObjectId,
      ref: 'Post',
    },
    body: {
      type: String,
    },
    avatar: String,
    likes: [{ type: ObjectId }],
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
