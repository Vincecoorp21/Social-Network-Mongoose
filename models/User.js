const mongoose = require('mongoose');

const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor rellena tu nombre'],
    },
    password: {
      type: String,
      required: [true, 'Por favor rellena tu contraseña'],
    },
    email: {
      type: String,
      unique: true,
      match: [/.+\@.+\..+/, 'Este correo no es válido'],
      required: [true, 'Por favor rellena tu correo'],
    },
    role: String,
    tokens: [],
    confirmed: Boolean,
    postId: [{ type: ObjectId, ref: 'Post' }],
    commentId: [{ type: ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
