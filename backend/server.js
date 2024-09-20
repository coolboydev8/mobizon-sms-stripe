const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const phoneRoutes = require('./routes/phoneRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const userRoutes = require('./routes/userRoutes');
const { initializeDatabase } = require('./config/initialDB');
const { restoreScheduledJobs } = require('./config/scheduleConfig');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//manage routes
app.use('/api', phoneRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/test', (req, res) => {
  res.status(200).json({data: 'ok'});
});

app.use(express.static(path.join(__dirname, '../public/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/build', 'index.html'));
});

initializeDatabase();
restoreScheduledJobs();

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));