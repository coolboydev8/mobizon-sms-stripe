const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { createCheckout ,checkoutPay, processWebhook } = require('../controllers/stripeController');

router.post('/create-checkout-session', createCheckout);
router.post('/checkout-session', checkoutPay);
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), processWebhook);

module.exports = router;
