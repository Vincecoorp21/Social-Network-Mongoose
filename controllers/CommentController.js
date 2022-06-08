const Comment = require('../models/Comment');

const Post = require('../models/Post');

//const { getAllusers } = require('./UserController');

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
      res.status(500).send({
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
  async updateComment(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        { ...req.body, userId: req.user._id },
        {
          new: true,
        }
      );
      res
        .status(201)
        .send({ message: 'Comentario actualizado con éxito', comment });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Ha habido un problema al actualizar el comentario' });
    }
  },
  async delete(req, res) {
    try {
      //solo lo elimina
      //const product = await Product.deleteOne({ _id: req.params_id });
      // Te lo muestra y te lo elimina
      const comment = await Comment.findByIdAndDelete(req.params._id);
      res.send({ comment, message: 'Comentario borrado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Hubo un problema al borrar el comentario',
      });
    }
  },
  async like(req, res) {
    try {
      const comment = await Comment.findById(req.params._id);
      if (comment.likes.includes(req.user._id)) {
        res.send('Ya le diste a like a este comentario');
      } else {
        const comment = await Comment.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        );
        res.send(comment);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Hay un problema dando un like a un comentario' });
    }
  },
  async dislike(req, res) {
    try {
      const comment = await Comment.findById(req.params._id);
      if (comment.likes.includes(req.user._id)) {
        res.send('Ya le quitaste el like a este coment');
      } else {
        const comment = await Comment.findByIdAndUpdate(
          req.params._id,
          { $pull: { likes: req.user._id } },
          { new: true }
        );
        res.send(comment);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Hay un problema quitando el like del comentario' });
    }
  },
};

module.exports = CommentController;
