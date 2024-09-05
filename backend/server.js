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

const app = express();
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // Allow requests from this origin
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//manage routes
app.use('/', phoneRoutes);
app.use('/admin', authRoutes);
app.use('/stripe', stripeRoutes);
app.use('/user', userRoutes);

initializeDatabase();
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));