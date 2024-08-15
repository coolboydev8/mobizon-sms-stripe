const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mariadb = require('mariadb');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {sendSMS} = require('./sms');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { date, phone } = req.body.formData;
  // const hashedPassword = await bcrypt.hash(password, 12);
  const emailToken = jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: '1d' });
  // const newUser = new User({ name, email, password: hashedPassword, emailToken });

  try {
      // await newUser.save();
      const url = `http://127.0.0.1:3000/verify-email?token=${emailToken}`;
      // const smsMessage = `Please click this link to confirm your email: <a href="${url}">${url}</a>`;
      const recipientPhoneNumber = '13393686969'; // Replace with the recipient's phone number
      
      await sendSMS(recipientPhoneNumber, url);

      res.status(201).send(url);

    } catch (error) {
      res.status(500).send(error.message);
  }
});

app.get('/verify-email', async (req, res) => {
  try {
      const { token } = req.query;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = decoded.phone === '13393686969'? true: false;
      if(!user){
        res.redirect('http://localhost:3001/oops');
        return res.status(404).send('error');  
      } 
      // const user = await User.findOne({ email: decoded.email });
      // if (!user) return res.status(404).send('User not found');

      // user.isVerified = true;
      // user.emailToken = null;
      // await user.save();
      res.redirect('http://localhost:3001/info_regist');
    } catch (error) {
      res.redirect('http://localhost:3001/oops'); 
      res.status(500).send(error.message);
  }
});

app.post('/create-checkout-session', async (req, res) => {
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
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3001/success', 
      cancel_url: 'http://localhost:3001/oops',
    });
    res.json({ id: session.id });
  } catch (error) {
    console,log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));