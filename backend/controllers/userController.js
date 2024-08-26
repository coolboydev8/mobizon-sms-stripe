const { updateUser, getUserInfo, updateGameStatusDB, getUser, removeUserDB } = require('../models/UserModel');
const { getAdminInfo } = require('../models/AuthModel');
const { send_check_option } = require('../config/sms');
const sendEmail = require('../config/maiiSend');
    
const updateInfo = async (req, res) => {
    try{
        const userData = req.body.formData;
        await updateUser(userData);
        res.status(200).json({ data: 200 });
    }catch(err){
        console.log(err);
    }
}

const getAllUser = async (req, res) => {
    try{
        const user_data = await getUserInfo(req.body.filterKey);
        res.status(200).json({ data: user_data });
    }catch(err){
        console.log(err);
    }
}

const updateGameStatus = async (req, res) => {
    try{
        const user_data = await updateGameStatusDB(req.body.payload);
        res.status(200).json({ data: 200 });
    }catch(err){
        console.log(err);
    }
}

const confirmAppointment = async(req, res) => {
    const date = req.body.payload_confirm.date;
    const option = req.body.payload_confirm.option;
    const phone = req.body.payload_confirm.phone;  
    let sendMsg_user = `Your reservation has been confirmed.\nOption: ${option}\nAppointment Date: ${date}\nPhone Number: ${phone} `;
    let sendMsg_admin = `One reservation confirmed.\nOption: ${option}\nAppointment Date: ${date}\nPhone Number: ${phone} `;
    try{
        const user = await getUser(phone);
        const admin = await getAdminInfo();
        const user_email = user.email;
        const admin_email = admin[0].email;
        send_check_option(phone, sendMsg);
        // const mailOptions_user = {
        //   from: admin_email,  // Sender address
        //   to: user_email,             // List of recipients
        //   subject: 'Your reservation has been confirmed.',     // Subject line
        //   text: sendMsg_user, // Plain text body
        //   html: `<p>${sendMsg_user}</p>` // HTML body
        // };    
        // const mailOptions_admin = {
        //     from: admin_email,  // Sender address
        //     to: admin_email,             // List of recipients
        //     subject: 'Your reservation has been confirmed.',     // Subject line
        //     text: sendMsg_admin, // Plain text body
        //     html: `<p>${sendMsg_admin}</p>` // HTML body
        // };    
        // await sendEmail(mailOptions_user);
        // await sendEmail(mailOptions_admin);
        // console.log('Email successfully sent!')   

    }catch(err){
        console.log(err);
    }
}
const removeUser = async (req, res) => {
    try{
        const user_data = await removeUserDB(req.body.row);
        res.status(200).json({ data: user_data });
    }catch(err){
        console.log(err);
    }
}


module.exports = { updateInfo, getAllUser, updateGameStatus, confirmAppointment, removeUser };
