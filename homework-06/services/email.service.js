// homework-06/services/email.service.js

const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  pool: true,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.API_KEY,
  },
};

const send = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: process.env.MAIL_POST,
    to,
    subject,
    html,
  };
  return await transporter.sendMail(emailOptions);
};

module.exports = {
  send,
};
