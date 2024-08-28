const pool = require('../config/dbconfig');
const bcrypt = require('bcrypt');

exports.getPasswordHash = async() => {
  try {
    const rows = await pool.query('SELECT password FROM admin WHERE id = 1');
    return rows[0][0].password;
  }catch(err) {
    console.log(err);
  }
}

exports.updateDate = async(newDate) => {
  try {
    await pool.query('UPDATE admin SET date = ? WHERE id = 1', [newDate]);
  }catch(err) {
    console.log(err);
  }
}

exports.updatePhone = async(newPhone) => {
  try {
    await pool.query('UPDATE admin SET phone = ? WHERE id = 1', [newPhone]);
  }catch(err) {
    console.log(err);
  }
}
exports.updateEmail = async(newEmail) => {
  try {
    await pool.query('UPDATE admin SET email = ? WHERE id = 1', [newEmail]);
  }catch(err) {
    console.log(err);
  }
}
exports.updatePrice = async(newPrice) => {
  try {
    await pool.query('UPDATE admin SET price = ? WHERE id = 1', [newPrice]);
  }catch(err) {
    console.log(err);
  }
}

exports.updatePassword = async(newPassword) => {
  const hash = await bcrypt.hash(newPassword, 10);
  try {
    await pool.query('UPDATE admin SET password = ? WHERE id = 1', [hash]);
  }catch(err) {
    console.log(err);
  }
}

exports.getAdminInfo = async() => {
  try {
    const result = await pool.query('SELECT * FROM admin');
    return result[0];
  }catch(err) {
    console.log(err);
  }
}
exports.getAppointmentDate = async() => {
  try {
    const result = await pool.query('SELECT * FROM admin');
    return result[0][0].date;
  }catch(err) {
    console.log(err);
  }
}

