const { send_check_option } = require('../config/sms');
const { updatePayStatus } = require('../models/UserModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkoutPay = async (req, res) => {
    try {
      const { phone, option } = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'appointment',
              },
              unit_amount: 1000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: option === '1'?'http://localhost:3001/success': 'http://localhost:3001/playgame', 
        cancel_url: 'http://localhost:3001/oops',
      });
      res.json({ id: session.id });
      await updatePayStatus(req.body);
      if(option === '1'){
        send_check_option(phone);
      }
    } catch (error) {
      console,log(error.message);
      res.status(500).json({ error: error.message });
    }
  }

module.exports = { checkoutPay };
