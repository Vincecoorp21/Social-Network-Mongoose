//const nodemailer = require('nodemailer');
const nodemailer = require('nodemailer');
//const { auth } = require('./keys');
require('dotenv').config();

const NODEMAILER_USER = process.env.NODEMAILER_USER;

const NODEMAILER_PASS = process.env.NODEMAILER_PASS;

// let transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: AUTH,
// });

// let transporter = nodemailer.createTransport({
//   host:

// })

let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

module.exports = transporter;
