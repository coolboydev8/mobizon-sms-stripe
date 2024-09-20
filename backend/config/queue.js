const Queue = require('bull');
const { getUser } = require('../models/UserModel');
const { send_check_option } = require('./sms');
const { send_Email } = require('./maiiSend');
const { removeUserReminder } = require('../models/ReserveModel');

const notificationQueue = new Queue('notifications', {
    redis: {
      host: '127.0.0.1', // Your Redis server host
      port: 6379,        // Your Redis server port
    }
});

notificationQueue.process(async (job, done) => {
    const phone = job.data.phone;
    const first_reminder = job.data.first_reminder;
    const job_name = job.data.job_name;
    try {
      if(job_name !== '111'){
        await removeUserReminder(job_name);
      }
      const user = await getUser(phone);
      let customer_email = user.email;
      let user_firstname = user.firstname;
      let user_lastname = user.lastname;
      let role_option = user.role_option;
      let date = user.appointmentdate;
      if(role_option === '1'){
        let text_msg = `${user_firstname}'s reservation has been confirmed.\nOption: ${role_option}\nAppointment Date: ${date}\nPhone Number: ${phone} `;
        await send_check_option(phone, text_msg);  
        if(first_reminder === 1){
          let html_msg = `<b>${user_firstname}'s reservation has been confirmed.</b><br/>
          <p>Option: ${role_option}<br/><br/>Appointment Date: ${date}<br/><br/>Phone Number: ${phone}
          </p>`      
          const mailOptions_admin = {
            from: process.env.SMTP_USER,  // Sender address
            to: `${process.env.SMTP_USER}, ${customer_email}`,             // List of recipients
            subject: `${user_firstname}'s reservation has been confirmed.`,     // Subject line
            text: text_msg, // Plain text body
            html: `${html_msg}` // HTML body
          };    
          await send_Email(mailOptions_admin);
        }
      }else{
        let text_msg = `Wir bestaetigen die Reservierung für ${user_firstname} ${user_lastname}.\nAm: ${date}\nIn Siegen: An der Alche 23, in Dillenburg: Hindenburgstraße 15`;
        await send_check_option(phone, text_msg);
        if(first_reminder === 1){
          let game_stat = user.gamestatus.split('.');  
          let html_msg = `<b>${user_firstname}'s reservation has been confirmed.</b><br/>
          <p>Option: ${role_option}<br/><br/>Appointment Date: ${date}<br/><br/>Phone Number: ${phone}<br/><br/>Game Status:<br/>
          First Test: ${game_stat[0][0]==='1'? 'Pass: ': 'Failure: '}${game_stat[1]}<br/>
          Second Test: ${game_stat[0][1]==='1'? 'Pass: ': 'Failure: '}${game_stat[2]}<br/>
          Third Test: ${game_stat[0][2]==='1'? 'Pass: ': 'Failure: '}${game_stat[3]}<br/>
          Forth Test: ${game_stat[0][3]==='1'? 'Pass: ': 'Failure: '}${game_stat[4]}<br/>
          Fifth Test: ${game_stat[0][4]==='1'? 'Pass: ': 'Failure: '}${game_stat[5]}<br/>
          </p>`;    
          const mailOptions_admin = {
            from: process.env.SMTP_USER,  // Sender address
            to: `${process.env.SMTP_USER}, ${customer_email}`,             // List of recipients
            subject: `${user_firstname}'s reservation has been confirmed.`,     // Subject line
            text: text_msg, // Plain text body
            html: `${html_msg}` // HTML body
          };    
         await send_Email(mailOptions_admin);              
        }
      }
  
    } catch (error) {
        console.error('Error processing task:', error);
    }
});

module.exports = { notificationQueue };  