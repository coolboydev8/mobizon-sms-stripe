const express = require('express');
const router = express.Router();
const { login, get_admin_info, changePassword, changePrice_1, changePrice_2, get_reminder_info } = require('../controllers/authController');

router.post('/login', login);
router.post('/change_password', changePassword);
router.post('/change_price_1', changePrice_1);
router.post('/change_price_2', changePrice_2);
router.post('/get_admin_info', get_admin_info);
router.post('/get_reminder_info', get_reminder_info);

module.exports = router;
