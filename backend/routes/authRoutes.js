const express = require('express');
const router = express.Router();
const { login, get_admin_info, get_appointment_date, changeDate, changePhone, changePassword, changeEmail, changePrice } = require('../controllers/authController');

router.post('/login', login);
router.post('/change_date', changeDate);
router.post('/change_phone', changePhone);
router.post('/change_password', changePassword);
router.post('/change_price', changePrice);
router.post('/change_email', changeEmail);
router.post('/get_admin_info', get_admin_info);
router.post('/get_appointment_date', get_appointment_date);

module.exports = router;
