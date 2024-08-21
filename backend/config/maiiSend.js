const nodemailer = require('nodemailer');

exports.send_mail = () => {

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false, // true for 465, false for 587
        auth: {
            user: 'goldenhouse0601@gmail.com', // your email
            pass: 'google_key', // your email password (consider using environment variables for security)
        }
    });

    // Set up email data
    let mailOptions = {
    from: 'goldenhouse0601@gmail.com', // sender address
    to: 'goldenhouse0601@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

}

