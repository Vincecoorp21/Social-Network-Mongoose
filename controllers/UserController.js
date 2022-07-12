const User = require('../models/User');
//const { getAll } = require('./UserController');
const bcrypt = require('bcryptjs');

const transporter = require('../config/nodemailer');

const jwt = require('jsonwebtoken');

//const { jwt_secret } = require('../config/keys');

require('dotenv').config();

const jwt_secret = process.env.JWT_SECRET;

const Post = require('../models/Post');

const { update } = require('./PostController');

const UserController = {
  async create(req, res, next) {
    try {
      let hash;
      if (req.body.password !== undefined) {
        hash = bcrypt.hashSync(req.body.password, 10);
      }
      if (req.file) req.body.avatar = req.file.filename;
      else {
        req.body.avatar = '/assets/users/profile-avatar-radom.jpeg';
      }
      const user = await User.create({
        ...req.body,
        password: hash,
        role: 'user',
        confirmed: true,
      });
      console.log(user);
      //res.status(201).send('Usuario creado con éxito', user);
      //const emailToken = jwt.sign({ email: req.body.email }, jwt_secret);
      // const url = 'http://localhost:4000/users/confirm/' + req.body.email;
      // await transporter.sendMail({
      //   to: req.body.email,
      //   subject: 'Confirme su registro',
      //   html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
      //   <a href="${url}"> Click para confirmar tu registro</a>
      //   `,
      // });
      res.status(201).send({
        message: 'Te hemos enviado un correo para confirmar el registro',
        user,
      });
    } catch (error) {
      console.log(error);
      error.origin = 'User';
      next(error);
      // res
      //   .status(401)
      //   .send({ message: 'Ha habido un problema al crear el usuario' });
    }
  },
  async confirm(req, res) {
    try {
      await User.findOneAndUpdate(
        { email: req.params.email },
        { confirmed: true },
        { new: true }
      );
      res.status(201).send('Usuario confirmado con exito');
    } catch (error) {
      console.error(error);
    }
  },
  //<---- OBTIENE TODOS USERS ----->//
  async getAllusers(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },
  //Login user_________>
  async login(req, res) {
    const user = await User.findOne({ email: req.body.email }).populate(
      'postId'
    );
    //console.log(user);
    try {
      if (!user) {
        return res
          .status(400)
          .send({ message: 'Usuario y contraseña incorrecto' });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: 'Debes de confirmar tu email' });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'User or password incorrect' });
      }
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      //hay otra manera de hacer esto?creando un campo dentro de
      //Token.create({ token: token, UserId: user._id });
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: 'Bienvenid@' + user.name, user, token });
    } catch (error) {
      res
        .status(401)
        .send({ message: 'Hay un problema checkeando el usuario...' });
    }
  },
  //-----Update User-------------_>//

  //-------Logout------------------------//
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: 'Desconectado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Hubo un problema al intentar conectar al usuario',
      });
    }
  },
  //-----------------------Get USER Info -----------------//
  async getUserInfo(req, res) {
    try {
      const user = await User.findById(req.user._id).populate('postId');
      console.log(user);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Hubo un problema al intentar mostrar la info del usuario',
      });
    }
  },
  async like(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      if (post.likes.includes(req.user._id)) {
        res.send('Ya le diste a like a este post');
      } else {
        const post = await Post.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        )
          .populate('commentId')
          .populate('userId');
        res.send(post);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hay un problema con los Likes' });
    }
  },
  async dislike(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id } },
        { new: true }
      )
        .populate('commentId')
        .populate('userId');
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hay un problema con los DisLikes' });
    }
  },
  async follow(req, res) {
    try {
      const user = await User.findById(req.params._id);
      if (user.followers.includes(req.user._id)) {
        res.send('Ya estás siguiendo a este usuario');
      } else {
        const follow = await User.findByIdAndUpdate(
          req.params._id,
          { $push: { followers: req.user._id } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { following: req.params._id } },
          { new: true }
        );
        res.send({ msg: 'Usuario seguido con éxito', follow });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Hay un problema dando un Follow a un usuario' });
    }
  },
  async unfollow(req, res) {
    try {
      const user = await User.findById(req.params._id);
      if (!user.followers.includes(req.user._id)) {
        res.send('No estás siguiendo a este usuario');
      } else {
        const unfollow = await User.findByIdAndUpdate(
          req.params._id,
          { $pull: { followers: req.user._id } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          req.user._id,
          { $pull: { following: req.params._id } },
          { new: true }
        );
        res.send({ msg: 'Ya no sigues a este usuario', unfollow });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hay un problema quitando un Follow' });
    }
  },
  async getUserPostFollowers(req, res) {
    try {
      const user = await User.findById(req.user._id).populate('postId');
      user._doc.countfollowers = user.followers.length;
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Hay un problema mostrando la info' });
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
  async getUserByName(req, res) {
    try {
      console.log(req);
      if (req.params.name.length > 20) {
        return res.status(400).send('Busqueda demasiado larga');
      }
      const name = new RegExp(req.params.name, 'i');
      const user = await User.find({ name });
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = UserController;
