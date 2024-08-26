const nodemailer = require('nodemailer');

async function sendEmail() {
    console.log("Creating transporter...");
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'goldenhouse0601@gmail.com',  
            pass: 'google key'
        }
    });

    console.log("Setting mail options...");
    let mailOptions = {
        from: 'goldenhouse0601@gmail.com',
        to: 'superstart072194@gmail.com',
        subject: 'Nodemailer Test',
        text: 'Hello world?',
        html: '<b>Hello world?</b>'
    };

    console.log("Attempting to send email...");
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email: %s', error);
    }
}

sendEmail();