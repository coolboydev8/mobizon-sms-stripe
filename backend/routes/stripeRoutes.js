const express = require('express');
const router = express.Router();
const { createCheckout ,checkoutPay } = require('../controllers/stripeController');

router.post('/create-checkout-session', createCheckout);
router.post('/checkout-session', checkoutPay);

module.exports = router;
