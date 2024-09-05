const schedule = require('node-schedule');
const { updateUser, getUserInfo, updateGameStatusDB, getUser, removeUserDB } = require('../models/UserModel');
const { send_check_option } = require('../config/sms');
const { send_Email } = require('../config/maiiSend');
const { parseDateString } = require('../config/parseDate');

const updateInfo = async (req, res) => {
    try{
        const userData = req.body.formData;
        await updateUser(userData);
        res.status(200).json({ data: 200 });
    }catch(err){
        console.log(err);
    }
}

const getOneUser = async (req, res) => {
    const phone = req.body.payload.phone; 
    const step = req.body.payload.payload_step;
    try{
        const user_data = await getUser(phone);
        let tempData = user_data.gamestatus.split('.');
        const send_data = tempData[parseInt(step)];
        res.status(200).json({ data: send_data });
    }catch(err){
        console.log(err);
    }
}

const getOneUserGame = async (req, res) => {
    const phone = req.body.payload.phone; 
    try{
        const user_data = await getUser(phone);
        res.status(200).json({ data: user_data.gamestatus });
    }catch(err){
        console.log(err);
    }
}

const getUserPayStatus = async (req, res) => {
    const phone = req.body.payload.phone; 
    try{
        const user_data = await getUser(phone);
        res.status(200).json({ data: user_data.paystatus });
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
const getOption2Game = async (req, res) => {
    const phone = req.body.payload.phone; 
    let send_data = [];
    try{
        const user_data = await getUser(phone);
        let tempData = user_data.gamestatus.split('.');
        for(let i = 0; i < 5; i ++){
            if(tempData[0][i] === '0'){
                send_data.push(i + 1);
            }
        }
        res.status(200).json({ data: send_data });
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
    const role_option = req.body.payload_confirm.role_option;
    const phone = req.body.payload_confirm.phone;  
    const user = await getUser(phone);
    let customer_email = user.email;
    let user_firstname = user.firstname;
    let game_stat = user.gamestatus.split('.');  
    let text_msg = `${user_firstname}'s reservation has been confirmed.\nOption: ${role_option}\nAppointment Date: ${date}\nPhone Number: ${phone} `;
    let html_msg = `<b>${user_firstname}'s reservation has been confirmed.</b><br/>
    <p>Option: ${role_option}<br/><br/>Appointment Date: ${date}<br/><br/>Phone Number: ${phone}<br/><br/>Game Status:<br/>
    First Test: ${game_stat[0][0]==='1'? 'Pass: ': 'Failure: '}${game_stat[1]}<br/>
    Second Test: ${game_stat[0][1]==='1'? 'Pass: ': 'Failure: '}${game_stat[2]}<br/>
    Third Test: ${game_stat[0][2]==='1'? 'Pass: ': 'Failure: '}${game_stat[3]}<br/>
    Forth Test: ${game_stat[0][3]==='1'? 'Pass: ': 'Failure: '}${game_stat[4]}<br/>
    Fifth Test: ${game_stat[0][4]==='1'? 'Pass: ': 'Failure: '}${game_stat[5]}<br/>
    </p>`;    
    try{
        const mailOptions_admin = {
            from: process.env.SMTP_USER,  // Sender address
            to: `${process.env.SMTP_USER}, ${customer_email}`,             // List of recipients
            subject: `${user_firstname}'s reservation has been confirmed.`,     // Subject line
            text: text_msg, // Plain text body
            html: `${html_msg}` // HTML body
        };    
        await send_check_option(phone, text_msg);
        await send_Email(mailOptions_admin);  
        const now = new Date();
        const timeUntilAppointment = parseDateString(date) - now;
        if (timeUntilAppointment > 0) {
            // Email 2: (reservation date - date that making reservation) / 3
            const email2Time = new Date(now.getTime() + timeUntilAppointment / 3);
            schedule.scheduleJob(email2Time, async() => {
              await send_check_option(phone, text_msg); 
            });
        
            // Email 3: (reservation date - date that making reservation) * 2 / 3
            const email3Time = new Date(now.getTime() + (timeUntilAppointment * 2) / 3);
            schedule.scheduleJob(email3Time, async() => {
              await send_check_option(phone, text_msg); 
            });
        
            // Email 4: reservation date - 1 hour
            const email4Time = new Date(parseDateString(date).getTime() - 60 * 60 * 1000);
            schedule.scheduleJob(email4Time, async() => {
              await send_check_option(phone, text_msg); 
            });
        }
        res.status(200).send({data: 200})
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

module.exports = { updateInfo, getOneUser, getAllUser, getUserPayStatus, updateGameStatus, confirmAppointment, removeUser, getOption2Game, getOneUserGame };
