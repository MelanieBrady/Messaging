const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const tokenUtils = require('../auth/token_utils');

// End point, handler of request and return response
router.get('/:username', tokenUtils.verifyToken, async (req, res) => {
    const username = req.params.username;
    console.log(username);
    console.log(req.headers);

    const user = await User.findOne({ username }).select({
        password: 0, _id: 0, __v: 0,
    });
    if (user) {
        res.status(200).send({
            user
        })
    } else {
        res.status(404).send({
            success: false,
            message: "username not found",
        })
    }


    console.log("message sent");
});

module.exports = router; 
