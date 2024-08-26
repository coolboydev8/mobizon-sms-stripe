const express = require('express');
const router = express.Router();
const { registPhone, verifyPhone, signinPhone } = require('../controllers/phoneController');

router.post('/register_phone', registPhone);
router.get('/verify_phone', verifyPhone);
router.post('/signin_phone', signinPhone);

module.exports = router;
