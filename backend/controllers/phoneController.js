const jwt = require('jsonwebtoken');
const { send_verify_sms } = require('../config/sms');
const { registUser } = require('../models/UserModel');

const registPhone = async (req, res) => {
    const { option, date, phone } = req.body.formData;
    const emailToken = jwt.sign({ option, date, phone }, process.env.JWT_SECRET, { expiresIn: '1d' });
    try {
        const url = `http://127.0.0.1:3000/verify_phone?token=${emailToken}`;
        await send_verify_sms(phone, url);
        res.status(201).send(url);
      } catch (error) {
        res.status(500).send(error.message);
    }
}

const verifyPhone = async (req, res) => {
    try {
        const { token } = req.query;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = decoded.phone !== null && decoded.option !== null && decoded.date !== null? true: false;
        if(!user){
          res.redirect('http://localhost:3001/oops');
          return res.status(404).send('error');  
        }   
        await registUser(decoded);  
        res.redirect(`http://localhost:3001/info_regist?phone=${decoded.phone}&option=${decoded.option}`);
      } catch (error) {
        res.redirect('http://localhost:3001/oops'); 
        res.status(500).send(error.message);
    }
}
  
module.exports = { registPhone, verifyPhone };
