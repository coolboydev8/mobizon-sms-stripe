const schedule = require('node-schedule');
const { send_check_option } = require('../config/sms');
const { updatePayStatus, updateUserEmail, getUser } = require('../models/UserModel');
const { getAdminInfo } = require('../models/AuthModel');
const { send_Email } = require('../config/maiiSend');
const { parseDateString } = require('../config/parseDate');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckout = async (req, res) => {
  const option  = req.body.role_option;
  const response = await getAdminInfo();
  const price = option === '1'?response[0].price_1: response[0].price_2; 
  const product_name = option === '1'? 'appointment': 'appointment2';
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'sofort', 'paypal', 'klarna'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product_name,
            },
            unit_amount: 100 * price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_API_URL}/stripe_success?session_id={CHECKOUT_SESSION_ID}`, 
      cancel_url: `${process.env.FRONTEND_API_URL}/oops`,
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const checkoutPay = async (req, res) => {
  const sessionId = req.body.payload.session_id;
  const date = req.body.payload.date;
  const role_option = req.body.payload.role_option;
  const phone = req.body.payload.phone;
  try {
    const user = await getUser(phone);
    if(user.paystatus === '1'){
      res.status(202).json({data: 'You have already paid'});
    }else{
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      let customer_email = session.customer_details.email;
      let user_firstname = user.firstname;
      let text_msg = `${user_firstname}'s reservation has been confirmed.\nOption: ${role_option}\nAppointment Date: ${date}\nPhone Number: ${phone} `;
      let html_msg = `<b>${user_firstname}'s reservation has been confirmed.</b><br/>
      <p>Option: ${role_option}<br/><br/>Appointment Date: ${date}<br/><br/>Phone Number: ${phone}
      </p>`    
  
      await updateUserEmail(customer_email, phone);
      if (session.payment_status === 'paid') {
        await updatePayStatus(phone);
        if(role_option === '1'){
          const mailOptions_admin = {
            from: process.env.SMTP_USER,  // Sender address
            to: `${process.env.SMTP_USER}, ${customer_email}`,             // List of recipients
            subject: `${user_firstname}'s reservation has been confirmed.`,     // Subject line
            text: text_msg, // Plain text body
            html: `${html_msg}` // HTML body
          };    
          await send_check_option(phone, text_msg);
          //await send_Email(mailOptions_admin);  
          const now = new Date();
          const timeUntilAppointment = parseDateString(date) - now;
          if (timeUntilAppointment > 0) {
            // Email 2: (reservation date - date that making reservation) / 3
            const email2Time = new Date(now.getTime() + timeUntilAppointment / 3);
            schedule.scheduleJob(email2Time, async() => {
              await send_check_option(phone, text_msg); 
            });
        
            // Email 3: (reservation date - date that making reservation) * 2 / 3
            const email3Time = new Date(now.getTime() + (timeUntilAppointment * 2) / 3);
            schedule.scheduleJob(email3Time, async() => {
              await send_check_option(phone, text_msg); 
            });
        
            // Email 4: reservation date - 1 hour
            const email4Time = new Date(parseDateString(date).getTime() - 60 * 60 * 1000);
            schedule.scheduleJob(email4Time, async() => {
              await send_check_option(phone, text_msg); 
            });        
          }        
        }    
        res.status(200).json({data: session});
      } else {
        res.status(201).json({ msg: 'Payment was not successful.' });
      }   
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}  

module.exports = { createCheckout ,checkoutPay };
