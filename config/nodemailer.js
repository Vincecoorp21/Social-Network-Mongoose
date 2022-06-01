const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'paraclase123bridge@gmail.com',
    pass: 'secretito123',
  },
});
module.exports = transporter;
