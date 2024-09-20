const schedule = require('node-schedule');

const { updatePayStatus, updateUserEmail, getUser } = require('../models/UserModel');
const { getAdminInfo } = require('../models/AuthModel');
const { insertUserReminder } = require('../models/ReserveModel');
const { parseDateString } = require('../config/parseDate');
const { notificationQueue } = require('../config/queue');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckout = async (req, res) => {
  const role_option = req.body.payload.role_option;
  const phone = req.body.payload.phone;
  const date = req.body.payload.date;
  const product_name = role_option === '1'? 'appointment': 'appointment2';
  try {
    const response = await getAdminInfo();
    const price = role_option === '1'?response[0].price_1: response[0].price_2;   
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
      metadata: {
        phone: phone
      },  
      payment_intent_data: {
        metadata: {
          phone: phone,
          date: date,
          role_option: role_option
        }  
      }
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const checkoutPay = async (req, res) => {
  const sessionId = req.body.payload.session_id;
  const phone = req.body.payload.phone;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const user = await getUser(phone);
    if(user.paystatus === '0'){
      res.status(200).json({data: session});
    }else if(user.paystatus === '1'){
      res.status(201).json({data: session});
    }else{
      res.status(202).json({data: session});
    }   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}  

const processWebhook = async (req, res) => {
  const event = req.body;
  try{
    switch (event.type) {
      case 'checkout.session.completed':
      {
        let session = event.data.object;
        let phone = session.metadata.phone;
        let customer_email = session.customer_details.email;
        await updateUserEmail(customer_email, phone);    
        break;
      }
      case 'payment_intent.succeeded':
      {
        let paymentIntent = event.data.object;
        let phone = paymentIntent.metadata.phone;
        let date = paymentIntent.metadata.date;
        let role_option = paymentIntent.metadata.role_option;
        let scheduleName = '';
        await updatePayStatus(phone, '1');
        if(role_option === '1'){
          notificationQueue.add({
            first_reminder: 1,
            phone: phone,
            job_name: '111'
          });      
          console.log('Scheduled notification task for user 0:', phone);
          const now = new Date();
          const timeUntilAppointment = parseDateString(date) - now - 7200000;
          if (timeUntilAppointment > 0) {
            // Email 2: 
            scheduleName = phone + '1';
            const email2Time = new Date(now.getTime() + (timeUntilAppointment / 3));
            schedule.scheduleJob(scheduleName, email2Time, () => {
              notificationQueue.add({
                first_reminder: 0,
                phone: phone,
                job_name: scheduleName
              });      
              console.log('Scheduled notification task for user 1:', phone);
            });        
            await insertUserReminder(scheduleName, phone, email2Time);
            // Email 3: 
            scheduleName = phone + '2';
            const email3Time = new Date(now.getTime() + ((timeUntilAppointment * 2) / 3));
            schedule.scheduleJob(scheduleName, email3Time, () => {
              notificationQueue.add({
                first_reminder: 0,
                phone: phone,
                job_name: scheduleName
              });      
              console.log('Scheduled notification task for user 2:', phone);
            });      
            await insertUserReminder(scheduleName, phone, email3Time);  
            // Email 4: 
            const email4Time = new Date(parseDateString(date).getTime() - (3 * 3600000));
            if((email4Time - email3Time) > 0){
              scheduleName = phone + '3';
              schedule.scheduleJob(scheduleName, email4Time, () => {
                notificationQueue.add({
                  first_reminder: 0,
                  phone: phone,
                  job_name: scheduleName
                });      
                console.log('Scheduled notification task for user 3:', phone);
              });      
              await insertUserReminder(scheduleName, phone, email4Time);  
            }
          }
        }
        break;
      }
      case 'payment_intent.processing':
      {
        let paymentIntent = event.data.object;
        let phone = paymentIntent.metadata.phone;
        await updatePayStatus(phone, '2');
        break;
      }
      case 'payment_intent.canceled':
      {
        let paymentIntent = event.data.object;
        let phone = paymentIntent.metadata.phone;
        await updatePayStatus(phone, '0');
        break;
      }
      case 'payment_intent.payment_failed':
      {
        let paymentIntent = event.data.object;
        let phone = paymentIntent.metadata.phone;
        await updatePayStatus(phone, '0');
        break;
      }    
        // Add additional cases for other event types as needed
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }  
  }catch(err){
    console.log(err);
  }
  res.status(200).json({ received: true });
}

module.exports = { createCheckout ,checkoutPay, processWebhook };
