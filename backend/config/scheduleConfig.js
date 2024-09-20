const schedule = require('node-schedule');
const { notificationQueue } = require('./queue');
const { getReminderList, removeUserReminder } = require('../models/ReserveModel');

const restoreScheduledJobs = async() => {
  const now = new Date();
    try {
      const rows = await getReminderList('');
      if(rows !== 0){
        rows.forEach(async({ job_name, phone, reserve_date }) => {
          if((reserve_date - now) > 0){
            schedule.scheduleJob(job_name, reserve_date, () => {
              notificationQueue.add({
                first_reminder: 0,
                phone: phone,
                job_name: job_name
              });      
            });                
          }else{
            await removeUserReminder(job_name);
          }
        });          
      }
    }catch (dbError) {
      console.error('Error restoring scheduled jobs from the database:', dbError);
    }
}

const cancelScheduledJob = async (job_list) => {
  job_list.forEach(async({ job_name }) => {
    const job = schedule.scheduledJobs[job_name];
    if (job) {
      job.cancel();
      console.log(`Cancelled job: ${job_name}`);
      try {
        await removeUserReminder(job_name);
      } catch (dbError) {
        console.error('Error deleting the scheduled job from the database:', dbError);
      }
    } else {
      console.log(`Job not found: ${job_name}`);
    }  
  });
}

module.exports = { restoreScheduledJobs ,cancelScheduledJob };
