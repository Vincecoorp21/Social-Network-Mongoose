//const nodemailer = require('nodemailer');
const nodemailer = require('nodemailer');
const { AUTH } = require('./keys');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: AUTH,
});
module.exports = transporter;
