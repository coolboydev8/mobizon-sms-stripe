const pool = require('../config/dbconfig');

exports.getReminderList = async(filterKey) => {
    try {
       const rows = await pool.query(`SELECT COUNT(*) AS count FROM user`);
        if(rows[0][0].count > 0){
            const [fields] = await pool.query(`SHOW COLUMNS FROM reminder`);
            const fieldNames = fields.map((field) => field.Field);
            const conditions = fieldNames.map((field) => `${field} LIKE ?`).join(' OR ');
            const filter_query = `SELECT * FROM reminder WHERE ${conditions}`;
            const searchPattern = `%${filterKey}%`;
            const queryValues = Array(fieldNames.length).fill(searchPattern);
            const result = await pool.query(filter_query, queryValues);
            return result[0];                
        }else{
            return 0;
        }
    }catch(err) {
        console.log(err);
    }
}

exports.insertUserReminder = async(job_name, phone, reserve_date) => {
    try {
        await pool.query("INSERT INTO reminder (job_name, phone, reserve_date) VALUES (?, ?, ?)", [job_name, phone, reserve_date]);  
        return 1;
    }catch(err) {
        console.log(err);
    }    
}

exports.removeUserReminder = async(row) => {
    try {
      await pool.query(`DELETE FROM reminder WHERE job_name = ${row}`);
      return 1;
    }catch(err) {
      console.log(err);
    }
}
  