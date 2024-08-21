const express = require('express');
const router = express.Router();
const { login, get_admin_info, changeDate, changePhone, changePassword } = require('../controllers/authController');

router.post('/login', login);
router.post('/change_date', changeDate);
router.post('/change_phone', changePhone);
router.post('/change_password', changePassword);
router.get('/get_admin_info', get_admin_info);

module.exports = router;
