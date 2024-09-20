const bcrypt = require('bcrypt');
const pool = require('./dbconfig');

exports.initializeDatabase = async(req, res) => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS admin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      price_1 INT NOT NULL,
      price_2 INT NOT NULL
      )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS user (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      role_option VARCHAR(255) NOT NULL,
      appointmentdate VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      birthday VARCHAR(255) NOT NULL,
      personid VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      street VARCHAR(255) NOT NULL,
      housenum VARCHAR(255) NOT NULL,
      code VARCHAR(255) NOT NULL,
      gamestatus VARCHAR(255) NOT NULL,
      paystatus VARCHAR(20) NOT NULL
    )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS reminder (
      reminder_id INT AUTO_INCREMENT PRIMARY KEY,
      job_name VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      reserve_date DATETIME NOT NULL
    )`);
    
    const hashedPassword = await bcrypt.hash('123', 10);
    const results = await pool.query('SELECT COUNT(*) AS count FROM admin');
    if(results[0][0].count === 0){
      await pool.query('INSERT INTO admin (password, price_1, price_2) VALUES (?, ?, ?)', [hashedPassword, 10, 10]);
    }
    console.log("Successed!");
  } catch (err){
    console.log(err);
  }
}