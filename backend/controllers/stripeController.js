const { send_check_option } = require('../config/sms');
const { updatePayStatus, getUser } = require('../models/UserModel');
const { getAdminInfo } = require('../models/AuthModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckout = async (req, res) => {
  const response = await getAdminInfo();
  const price = response[0].price
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'appointment',
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
  let sendMsg_user = `Your reservation has been confirmed.\nOption: ${role_option}\nAppointment Date: ${date}\nPhone Number: ${phone} `;
  let sendMsg_admin = `One reservation confirmed.\nOption: ${role_option}\nAppointment Date: ${date}\nPhone Number: ${phone} `;
    
  try {
    const user = await getUser(phone);
    // const admin = await getAdminInfo();
    // const user_email = user.email;
    // const admin_email = admin[0].email;    
    if(user.paystatus === '1'){
      res.status(202).json({data: 'You have already paid'});
    }else{
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === 'paid') {
        await updatePayStatus(phone);
       if(role_option === '1'){
         send_check_option(phone, sendMsg_user);
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
