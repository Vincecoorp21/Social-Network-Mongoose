const Comment = require('../models/Comment');

const Post = require('../models/Post');

const CommentController = {
  async create(req, res) {
    try {
      const comment = await Comment.create({
        ...req.body,
        userId: req.user._id,
        postId: req.params._id,
      });
      await Post.findByIdAndUpdate(req.params._id, {
        $push: { commentId: comment._id },
      });
      res.status(201).send(comment);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'We had a problem adding the comment...' });
    }
  },
};

module.exports = CommentController;
