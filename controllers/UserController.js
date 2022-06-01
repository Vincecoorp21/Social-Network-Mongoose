const User = require('../models/User');
//const { getAll } = require('./UserController');
const bcrypt = require('bcryptjs');

const transporter = require('../config/nodemailer');

const jwt = require('jsonwebtoken');

const { jwt_secret } = require('../config/keys');
const { update } = require('./PostController');

const UserController = {
  async create(req, res, next) {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password: hash,
        role: 'user',
        confirmed: false,
      });
      //res.status(201).send('Usuario creado con éxito', user);
      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret);
      const url = 'http://localhost:4000/users/confirm/' + req.body.email;
      await transporter.sendMail({
        to: req.body.email,
        subject: 'Confirme su registro',
        html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
        <a href="${url}"> Click para confirmar tu registro</a>
        `,
      });
      res.status(201).send({
        message: 'Te hemos enviado un correo para confirmar el registro',
        user,
      });
    } catch (error) {
      //error.origin = 'User';
      res
        .status(401)
        .send({ message: 'Ha habido un problema al crear el usuario' });
      next(error);
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
    const user = await User.findOne({ email: req.body.email });
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
      const user = await User.findById(req.user._id);
      console.log(user);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Hubo un problema al intentar mostrar la info del usuario',
      });
    }
  },
};

module.exports = UserController;
