const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,     //(This is the link for password creation)https://www.youtube.com/watch?v=lBRnLXwjLw0&t=1471s
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,      //Sender Gmail
    to: options.email,                //Recipient Gmail(We can send one mail to the multiple recipient by add gmail address following "," )
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;