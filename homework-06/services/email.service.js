// homework-06/services/email.service.js

const sgMail = require("@sendgrid/mail");
const mjml2html = require("mjml");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (to, verificationLink) => {
  const mjmlTemplate = `
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>
              <h1>Welcome to our Contacts App!</h1>
            </mj-text>
            <mj-text>
              <p>If you want to use our contacts database and create your own address book, you need to verify your email address.</p>
            </mj-text>
            <mj-button href="${verificationLink}">
              Verify Email
            </mj-button>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;

  const { html } = mjml2html(mjmlTemplate);

  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL,
    subject: "Email Verification",
    html,
  };
  await sgMail.send(msg);
};

module.exports = {
  sendVerificationEmail,
};

// // homework-06/services/email.service.js

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const config = {
//   pool: true,
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.API,
//     pass: process.env.SENDGRID_API_KEY,
//   },
// };

// const send = async ({ to, subject, html }) => {
//   const transporter = nodemailer.createTransport(config);
//   const emailOptions = {
//     from: process.env.SENDGRID_EMAIL,
//     to,
//     subject,
//     html,
//   };
//   return await transporter.sendMail(emailOptions);
// };

// module.exports = {
//   send,
// };
