const express = require('express');
const router = express.Router();
const { updateInfo, getAllUser, getOption2Game, getOneUserGame, getUserPayStatus, updateGameStatus, confirmAppointment, removeUser, getOneUser } = require('../controllers/userController');

router.post('/update_info', updateInfo);
router.post('/update_game_status', updateGameStatus);
router.post('/get_one_user', getOneUser);
router.post('/get_user_info', getAllUser);
router.post('/get_option2_game', getOption2Game);
router.post('/get_one_user_game', getOneUserGame);
router.post('/get_user_paystatus', getUserPayStatus);
router.post('/confirm_appointment', confirmAppointment);
router.post('/remove_user', removeUser);

module.exports = router;
