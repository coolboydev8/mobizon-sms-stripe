const express = require('express');
const router = express.Router();
const { registPhone, verifyPhone } = require('../controllers/phoneController');

router.post('/register_phone', registPhone);
router.get('/verify_phone', verifyPhone);

module.exports = router;
