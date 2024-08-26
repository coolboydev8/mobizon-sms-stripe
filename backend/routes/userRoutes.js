const express = require('express');
const router = express.Router();
const { updateInfo, getAllUser, updateGameStatus, confirmAppointment, removeUser } = require('../controllers/userController');

router.post('/update_info', updateInfo);
router.post('/update_game_status', updateGameStatus);
router.post('/get_user_info', getAllUser);
router.post('/confirm_appointment', confirmAppointment);
router.post('/remove_user', removeUser);
module.exports = router;
