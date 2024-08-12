// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const mariadb = require('mariadb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
// const pool = mariadb.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// Route: Root (User side)
app.get('/', (req, res) => {
  res.send('User side: Implement React.js for the front end.');
});

// Route: /server (Admin login)
app.get('/server', (req, res) => {
  res.send('Admin page: Enter password to continue.');
});

app.post('/server/login', async (req, res) => {
  const { password } = req.body;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT password FROM users WHERE id = 1 LIMIT 1');
    const hashedPassword = rows[0].password;
    conn.release();

    if (await bcrypt.compare(password, hashedPassword)) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Incorrect password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Route: Change password
app.post('/server/change-password', async (req, res) => {
  const { newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const conn = await pool.getConnection();
    await conn.query('UPDATE users SET password = ? WHERE id = 1', [hashedPassword]);
    conn.release();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});