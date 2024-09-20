const jwt = require('jsonwebtoken');
const { send_verify_sms } = require('../config/sms');
const { registUser, getUser, updateUserDate } = require('../models/UserModel');

const registPhone = async (req, res) => {
  const { role_option, date, phone } = req.body.formData;
  try {
      const user_info = await getUser(phone);
      if(user_info){
        res.status(201).send({data: 'Customer already exists'});
      }else{
        const emailToken = jwt.sign({ role_option, date, phone }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const url = `http://sms-termin.de/api/verify_phone?token=${emailToken}`;
        await send_verify_sms(phone, url);
        res.status(200).send({data: 'Reservation has been confirmed.'});
        console.log(url);
      }
    }catch (error){
      res.status(500).send(error.message);
  }
}

const verifyPhone = async (req, res) => {
  try {
      const { token } = req.query;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = decoded.phone !== null? true: false;
      if(user){
        await registUser(decoded);  
        res.redirect(`${process.env.FRONTEND_API_URL}/info_regist?phone=${decoded.phone}&role_option=${decoded.role_option}&date=${decoded.date}`);  
      }else{
        res.redirect(`${process.env.FRONTEND_API_URL}/oops`);  
      }   
    }catch(error) {
      res.redirect(`${process.env.FRONTEND_API_URL}/oops`); 
      console.log(error);
  }
}

const signinPhone = async (req, res) => {
  try {
    const phone = req.body.formData.phone;
    const user_info = await getUser(phone);
    if(user_info.firstname){
      if(user_info.paystatus === '1'){
        user_info.role_option === '1'?res.status(201).send({data: user_info}):res.status(202).send({data: user_info}); //paid
      }else if(user_info.paystatus === '2'){
        res.status(203).send({data: 'pending'});
      }else{
        res.status(200).send({data: user_info}); //not paid
      }
    }else if(user_info.phone && !user_info.firstname){
      res.redirect(`${process.env.FRONTEND_API_URL}/info_regist?phone=${user_info.phone}&role_option=${user_info.role_option}&date=${user_info.date}`);  
    }else if(!user_info.phone){
      res.status(205).send({data: 'No account'}); //not paid
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { registPhone, verifyPhone, signinPhone };
