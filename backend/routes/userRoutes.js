const express = require('express');
const router = express.Router();
const { updateInfo, getAllUser, updateGameStatus } = require('../controllers/userController');

router.post('/update_info', updateInfo);
router.post('/update_game_status', updateGameStatus);
router.get('/get_user_info', getAllUser);

module.exports = router;
