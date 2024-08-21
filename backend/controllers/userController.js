const { updateUser, getUserInfo, updateGameStatusDB } = require('../models/UserModel');

const updateInfo = async (req, res) => {
    try{
        const userData = req.body.formData;
        console.log(userData);
        await updateUser(userData);
        res.status(200).json({ data: 200 });
    }catch(err){
        console.log(err);
    }
}

const getAllUser = async (req, res) => {
    try{
        const user_data = await getUserInfo();
        res.status(200).json({ data: user_data });
    }catch(err){
        console.log(err);
    }
}

const updateGameStatus = async (req, res) => {
    try{
        const user_data = await updateGameStatusDB(req.body.payload);
        res.status(200).json({ data: 200 });
    }catch(err){
        console.log(err);
    }
}


module.exports = { updateInfo, getAllUser, updateGameStatus };
