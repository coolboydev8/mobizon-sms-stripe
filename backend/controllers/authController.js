const bcrypt = require('bcrypt');
const { getPasswordHash, getAdminInfo, updatePassword, updatePrice_1, updatePrice_2 } = require('../models/AuthModel');
const { getReminderList } = require('../models/ReserveModel');

exports.get_admin_info = async(req, res) => {
  try{
    const admin_info = await getAdminInfo();
    res.status(200).json({ data: admin_info });
  }catch(err){
    console.log(err);
  }
}
exports.get_reminder_info = async(req, res) => {
  try{
    const reminder_data = await getReminderList(req.body.filterReminder);
    res.status(200).json({ data: reminder_data });
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
    res.status(201).json({ data: err });
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
exports.changePrice_1 = async(req, res) =>{
  try{
    await updatePrice_1(req.body.adminPrice_1);
    res.status(200).json({ data: 200 });
  }catch(err){
    console.log(err);
  }
}
exports.changePrice_2 = async(req, res) =>{
  try{
    await updatePrice_2(req.body.adminPrice_2);
    res.status(200).json({ data: 200 });
  }catch(err){
    console.log(err);
  }
}

