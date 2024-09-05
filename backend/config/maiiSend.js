const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
  }
});

const send_Email = async (mailOptions) => {
  try{
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  }catch(err){
    console.log(err);
  }
};

module.exports = { send_Email };