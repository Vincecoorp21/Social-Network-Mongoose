//const { update } = require('../models/Post');

const Post = require('../models/Post');

const User = require('../models/User');

const Comment = require('../models/Comment');

const PostController = {
  async create(req, res) {
    try {
      if (req.file) req.body.avatar = req.file.filename;
      const post = await Post.create({ ...req.body, userId: req.user._id });
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Ha habido un problema al crear el post' });
    }
  },
  async getAll(req, res) {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (error) {
      console.log(error);
    }
  },
  async getPostByName(req, res) {
    try {
      console.log(req);
      if (req.params.name.length > 20) {
        return res.status(400).send('Busqueda demasiado larga');
      }
      const title = new RegExp(req.params.name, 'i');
      const post = await Post.find({ title });
      res.send(post);
    } catch (error) {
      console.log(error);
    }
  },
  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      res.send(post);
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    try {
      //solo lo elimina
      //const product = await Product.deleteOne({ _id: req.params_id });
      // Te lo muestra y te lo elimina
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ post, message: 'Post deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'there was a problem trying to remove the post',
      });
    }
  },
  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { ...req.body, userId: req.user._id },
        {
          new: true,
        }
      );
      res.send({ message: ' Post actualizado', post });
    } catch (error) {
      console.log.error(error);
    }
  },
  async getAllWComments(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find()
        .populate('commentId')
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.send(posts);
    } catch (error) {
      console.error(error);
    }
  },

  // async like (req, res) {
  //   try {
  //     const post = await Post.findByIdAndUpdate(req.params._id,
  //     )

  //   }
  // }
};

module.exports = PostController;
