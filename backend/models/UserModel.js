const { dbGetConnection } = require('../config/dbconfig');

exports.getUserInfo = async() => {
  let conn;
  try {
    conn = await dbGetConnection();
    const result = await conn.query('SELECT * FROM user');
    conn.end();
    return result;
  } catch(err) {
    console.log(err);
    if (conn) conn.end();
  }
}

exports.registUser = async(userData) => {
  let conn;
  try {
    conn = await dbGetConnection();
    const rows = await conn.query(`SELECT COUNT(*) AS count FROM user WHERE phone = ${userData.phone}`);
    let paystatus = '0';
    let gamestatus = '00000.0.0.0.0.0';
    if(rows[0].count === 0n){
      await conn.query("INSERT INTO user (option, appointmentdate, phone, paystatus, gamestatus) VALUES (?, ?, ?, ?, ?)", [userData.option, userData.date, userData.phone, paystatus, gamestatus]);  
    }
    conn.end();
  }catch(err){
    console.log(err);
    if (conn) conn.end();
    return false;
  }
}

exports.updateUser = async(userData) => {
  let conn; 
  const phone = userData.phone;
  const {firstname, lastname, birthday, personid, email, city, streetname, housenum, code} = userData.info;
  try {
    conn = await dbGetConnection();
    const rows = await conn.query(`SELECT COUNT(*) AS count FROM user WHERE phone = ${userData.phone}`);
    if(rows[0].count === 1n){
      await conn.query("UPDATE user SET firstname = ?, lastname = ?, birthday = ?, personid = ?, email = ?, city = ?, street = ?, housenum = ?, code = ? WHERE phone = ?", [firstname, lastname, birthday, personid, email, city, streetname, housenum, code, phone]);
      conn.end();
      return 1;
    }else{
      conn.end();
      return 0;
    }
  }catch(err) {
    console.log(err);
    if (conn) conn.end();
    return 0;
  }
}
exports.updatePayStatus = async(userData) => {
  let conn; 
  const phone = userData.phone;
  try {
    conn = await dbGetConnection();
    await conn.query("UPDATE user SET paystatus = ? WHERE phone = ?", ['1', phone]);
    conn.end();
    return 1;
  }catch(err) {
    console.log(err);
    if (conn) conn.end();
    return 0;
  }
}
const setCharAt = (str, index, chr) => {
  if (index < 0 || index >= str.length) {
      throw new Error("Index out of bounds");
  }
  // Convert the string to an array of characters
  const strArray = str.split('');
  
  // Set the character at the specified index
  strArray[index] = chr;
  
  // Join the array back into a string
  return strArray.join('');
}
exports.updateGameStatusDB = async(data) => {
  const {phone, report, step} = data;
  console.log(data);
  try {
    conn = await dbGetConnection();
    const rows = await conn.query(`SELECT gamestatus FROM user WHERE phone = ${phone}`);
    let tempStat = rows[0].gamestatus.split('.');
    let tempData;
    let tempNum = 0;
    tempNum = parseInt(tempStat[step]) + 1;
    if(report === 'success'){
      tempStat[0] = setCharAt(tempStat[0], step - 1, '1');
      tempStat[step] = '' + tempNum;
    }else if(report === 'retry'){
      tempStat[step] = '' + tempNum;
    }else if(report === 'ignore'){
      tempStat[step] = '' + tempNum;
    }
    console.log(tempStat);
    tempData = tempStat[0] + '.' + tempStat[1] + '.' + tempStat[2] + '.' + tempStat[3] + '.' + tempStat[4] + '.' + tempStat[5]; 
    await conn.query("UPDATE user SET gamestatus = ? WHERE phone = ?", [tempData, phone]);
    conn.end();
    return 1;
  }catch(err) {
    console.log(err);
    if (conn) conn.end();
    return 0;
  }
}
