const express = require('express');
const router = express.Router();
const { checkoutPay } = require('../controllers/stripeController');

router.post('/create-checkout-session', checkoutPay);

module.exports = router;
