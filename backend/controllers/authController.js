const bcrypt = require('bcrypt');
const { getPasswordHash, getAdminInfo, getAppointmentDate, updateDate, updatePhone, updatePassword, updateEmail, updatePrice } = require('../models/AuthModel');

exports.get_admin_info = async(req, res) => {
  try{
    const admin_info = await getAdminInfo();
    res.status(200).json({ data: admin_info });
  }catch(err){
    console.log(err);
  }
}

exports.get_appointment_date = async(req, res) => {
  try{
    const date = await getAppointmentDate();
    res.status(200).json({ data: date });
  }catch(err){
    console.log(err);
  }
}

exports.login = async(req, res) =>{
  const password = req.body.formData.password;
  const hash = await getPasswordHash();
  try{
    if (await bcrypt.compare(password, hash)) {
      res.status(200).json({ data: 200 });
    } else {
      res.status(201).json({ data: 201 });
    }  
  }catch(err){
    console.log(err);
  }
}

exports.changeDate = async(req, res) =>{
  try{
    await updateDate(req.body.adminDate);
    res.status(200).json({ data: 200 });
  }catch(err){
    console.log(err);
  }
}
exports.changePhone = async(req, res) =>{
  try{
    await updatePhone(req.body.adminPhone);
    res.status(200).json({ data: 200 });
  }catch(err){
    console.log(err);
  }
}
exports.changePassword = async(req, res) =>{
  try{
    await updatePassword(req.body.adminPassword);
    res.status(200).json({ data: 200 });
  }catch(err){
    console.log(err);
  }
}
exports.changeEmail = async(req, res) =>{
  try{
    await updateEmail(req.body.adminEmail);
    res.status(200).json({ data: 200 });
  }catch(err){
    console.log(err);
  }
}
exports.changePrice = async(req, res) =>{
  try{
    await updatePrice(req.body.adminPrice);
    res.status(200).json({ data: 200 });
  }catch(err){
    console.log(err);
  }
}

