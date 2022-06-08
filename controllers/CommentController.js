const Comment = require('../models/Comment');

const Post = require('../models/Post');
const { getAllusers } = require('./UserController');

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
        .send({
          message: 'Hemos tenido un problema añadiendo el comentario...',
        });
    }
  },
  async getAllComments(req, res) {
    try {
      const comments = await Comment.find();
      res.send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'No hemos podido mostrar los comentarios' });
    }
  },
};

module.exports = CommentController;
