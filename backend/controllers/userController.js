const schedule = require('node-schedule');

const { updateUser, getUserInfo, updateGameStatusDB, getUser, removeUserDB, getUserPhoneById } = require('../models/UserModel');

const { notificationQueue } = require('../config/queue');
const { cancelScheduledJob } = require('../config/scheduleConfig');
const { getReminderList } = require('../models/ReserveModel');

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

const getUserPayStatus = async (req, res) => {
    const phone = req.body.payload.phone; 
    try{
        const user_data = await getUser(phone);
        res.status(200).json({ data: user_data.paystatus });
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
    const step = req.body.payload.payload_step;
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
    const phone = req.body.payload_confirm.phone;  
    const date = req.body.payload_confirm.date;
    try{
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
        res.status(200).send({data: 200})
    }catch(err){
        console.log(err);
    }
}
const removeUser = async (req, res) => {
    try{
        const user_id = req.body.row;
        const phone  = await getUserPhoneById(user_id);
        const job_list = await getReminderList(phone);
        await cancelScheduledJob(job_list);
        const user_data = await removeUserDB(user_id);
        res.status(200).json({ data: user_data });
    }catch(err){
        console.log(err);
    }
}


module.exports = { updateInfo, getOneUser, getAllUser, getUserPayStatus, updateGameStatus, confirmAppointment, removeUser, getOption2Game, getOneUserGame };
