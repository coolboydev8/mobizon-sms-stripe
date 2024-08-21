  const mariadb = require('mariadb');
const bcrypt = require('bcrypt');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smsdb',
});

exports.dbGetConnection = async(req, res) => {
  try {
    return await pool.getConnection();
  } catch (err) {
    throw err;
  }   
}


exports.initializeDatabase = async(req, res) => {
  try {
    const conn = await pool.getConnection();
    await conn.query(`CREATE TABLE IF NOT EXISTS admin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL DEFAULT '123456789',
      date DATETIME NOT NULL DEFAULT NOW()
    )`);
    await conn.query(`CREATE TABLE IF NOT EXISTS user (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      option VARCHAR(255) NOT NULL,
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
    
    const hashedPassword = await bcrypt.hash('123', 10);
    const results = await conn.query('SELECT COUNT(*) AS count FROM admin');
    if(results[0].count === 0n){
      await conn.query('INSERT INTO admin (password, phone, date) VALUES (?, ?, NOW())', [hashedPassword, '123456789']);
    }
    console.log("Successed!");
    // Check if the password already exists
  } catch (err){
    console.log(err.message);
  }
}

