const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tokenUtils = require('../auth/token_utils');
const User = mongoose.model('User');


// End point, handler of request and return response
router.patch('/add/:username/', tokenUtils.verifyToken, async (req, res) => {
    const userToAdd = req.body.usernameToAdd;
    const userLoggedIn = req.params.username;

    const user = await User.findOne({ userLoggedIn });

    if (user) {
        user.favoritesList.push(userToAdd);
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Saved user as favorite!',
            user,
        })
    } else {
        res.status(404).send({
            success: false,
            message: 'User not found',
        })
    }

});

module.exports = router; 
