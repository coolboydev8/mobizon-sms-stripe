const pool = require('../config/dbconfig');

const setCharAt = (str, index, chr) => {
  if (index < 0 || index >= str.length) {
      throw new Error("Index out of bounds");
  }
  const strArray = str.split('');
  strArray[index] = chr;
  return strArray.join('');
}

exports.getUser = async(phone) => {
  try {
    const rows = await pool.query(`SELECT * FROM user WHERE phone = ${phone}`);
    return rows[0][0];
  }catch(err) {
    console.log(err);
  }
}

exports.removeUserDB = async(row) => {
  try {
    await pool.query(`DELETE FROM user WHERE user_id = ${row}`);
    const result = await pool.query('SELECT * FROM user');
    return result[0];
  }catch(err) {
    console.log(err);
  }
}

exports.getUserInfo = async(filterKey) => {
  try {
    const [fields] = await pool.query(`SHOW COLUMNS FROM user`);
    const fieldNames = fields.map((field) => field.Field);
    const conditions = fieldNames.map((field) => `${field} LIKE ?`).join(' OR ');
    const filter_query = `SELECT * FROM user WHERE ${conditions}`;
    const searchPattern = `%${filterKey}%`;
    const queryValues = Array(fieldNames.length).fill(searchPattern);
    const result = await pool.query(filter_query, queryValues);
    return result[0];
  }catch(err) {
    console.log(err);
  }
}

exports.registUser = async(userData) => {
  try {
    const rows = await pool.query(`SELECT COUNT(*) AS count FROM user WHERE phone = ${userData.phone}`);
    let paystatus = '0';
    let gamestatus = '00000.0.0.0.0.0';
    if(rows[0][0].count === 0){
      await pool.query("INSERT INTO user (role_option, appointmentdate, phone, paystatus, gamestatus) VALUES (?, ?, ?, ?, ?)", [userData.role_option, userData.date, userData.phone, paystatus, gamestatus]);  
    }
  }catch(err) {
    console.log(err);
  }
}

exports.updateUser = async(userData) => {
  const {firstname, lastname, birthday, personid, city, streetname, housenum, code} = userData.info;
  try {
    const rows = await pool.query(`SELECT COUNT(*) AS count FROM user WHERE phone = ${userData.phone}`);
    if(rows[0][0].count === 1){
      await pool.query("UPDATE user SET firstname = ?, lastname = ?, birthday = ?, personid = ?, city = ?, street = ?, housenum = ?, code = ? WHERE phone = ?", [firstname, lastname, birthday, personid, city, streetname, housenum, code, userData.phone]);
      return 1;
    }else{
      return 0;
    }
  }catch(err) {
    console.log(err);
    return 0;
  }
}

exports.updateUserEmail = async(customer_email, phone) => {
  try {
    await pool.query("UPDATE user SET email = ? WHERE phone = ?", [customer_email, phone]);
    return 1;
  }catch(err) {
    console.log(err);
    return 0;
  }
}

exports.updatePayStatus = async(phone) => {
  try {
    await pool.query("UPDATE user SET paystatus = ? WHERE phone = ?", ['1', phone]);
    return 1;
  }catch(err) {
    console.log(err);
    return 0;
  }
}
exports.updateGameStatusDB = async(data) => {
  const {phone, report, payload_step} = data;
  try {
    const rows = await pool.query(`SELECT gamestatus FROM user WHERE phone = ${phone}`);
    let tempStat = rows[0][0].gamestatus.split('.');
    let tempData;
    let tempNum = 0;
    tempNum = parseInt(tempStat[payload_step]) + 1;
    if(report === 'success'){
      tempStat[0] = setCharAt(tempStat[0], payload_step - 1, '1');
      tempStat[payload_step] = '' + tempNum;
    }else if(report === 'retry'){
      tempStat[payload_step] = '' + tempNum;
    }else if(report === 'ignore'){
      tempStat[payload_step] = '' + tempNum;
    }
    tempData = tempStat[0] + '.' + tempStat[1] + '.' + tempStat[2] + '.' + tempStat[3] + '.' + tempStat[4] + '.' + tempStat[5]; 
    await pool.query("UPDATE user SET gamestatus = ? WHERE phone = ?", [tempData, phone]);
    return 1;
  }catch(err) {
    console.log(err);
    return 0;
  }
}
