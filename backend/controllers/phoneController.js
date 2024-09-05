const jwt = require('jsonwebtoken');
const { send_verify_sms } = require('../config/sms');
const { registUser, getUser } = require('../models/UserModel');

const registPhone = async (req, res) => {
    const { role_option, date, phone } = req.body.formData;
    try {
        const user_info = await getUser(phone);
        if(user_info){
          res.status(203).send({data: 'The user is already registered.'});/////already registered user
        }else{
          const emailToken = jwt.sign({ role_option, date, phone }, process.env.JWT_SECRET, { expiresIn: '1d' });
          const url = `${process.env.REACT_APP_API_URL}/verify_phone?token=${emailToken}`;
         await send_verify_sms(phone, url);
          res.status(200).send({data: 200});
          console.log(url);
        }
      } catch (error) {
        res.status(500).send(error.message);
    }
}

const verifyPhone = async (req, res) => {
  try {
      const { token } = req.query;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = decoded.phone !== null && decoded.role_option !== null && decoded.date !== null? true: false;
      if(!user){
        res.redirect(`${process.env.FRONTEND_API_URL}/oops`);
        return res.status(404).send('error');  
      }else{
        await registUser(decoded);  
        res.redirect(`${process.env.FRONTEND_API_URL}/info_regist?phone=${decoded.phone}&role_option=${decoded.role_option}&date=${decoded.date}`);  
      }   
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_API_URL}/oops`); 
      res.status(500).send(error.message);
  }
}

const signinPhone = async (req, res) => {
  try {
    const phone = req.body.formData.phone;
    const user_info = await getUser(phone);
    if(user_info.firstname){
      if(user_info.paystatus === '1'){
        user_info.role_option === '1'?res.status(201).send({data: user_info}):res.status(200).send({data: user_info});//paid
      }else{
        res.status(202).send({data: user_info});//stripe
      }
    }else{
      res.status(203).send('ok');//no account
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { registPhone, verifyPhone, signinPhone };
