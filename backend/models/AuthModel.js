const { dbGetConnection } = require('../config/dbconfig');
const bcrypt = require('bcrypt');

exports.getPasswordHash = async() => {
  let conn;
  try {
    conn = await dbGetConnection();
    const rows = await conn.query('SELECT password FROM admin WHERE id = 1');
    return rows[0].password;
  } finally {
    if (conn) conn.end();
  }
}

exports.updateDate = async(newDate) => {
  let conn;
  try {
    conn = await dbGetConnection();
    await conn.query('UPDATE admin SET date = ? WHERE id = 1', [newDate]);
    conn.end();
  } catch(err) {
    console.log(err);
    if (conn) conn.end();
  }
}

exports.updatePhone = async(newPhone) => {
  let conn;
  try {
    conn = await dbGetConnection();
    await conn.query('UPDATE admin SET phone = ? WHERE id = 1', [newPhone]);
    conn.end();
  } catch(err) {
    console.log(err);
    if (conn) conn.end();
  }
}
exports.updatePassword = async(newPassword) => {
  const hash = await bcrypt.hash(newPassword, 10);
  let conn;
  try {
    conn = await dbGetConnection();
    await conn.query('UPDATE admin SET password = ? WHERE id = 1', [hash]);
    conn.end();
  } catch(err) {
    console.log(err);
    if (conn) conn.end();
  }
}

exports.getAdminInfo = async() => {
  let conn;
  try {
    conn = await dbGetConnection();
    const result = await conn.query('SELECT * FROM admin');
    conn.end();
    return result;
  } catch(err) {
    console.log(err);
    if (conn) conn.end();
  }
}
