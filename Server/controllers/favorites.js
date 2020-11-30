const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tokenUtils = require('../auth/token_utils');
const User = mongoose.model('User');


// End point, handler of request and return response
router.patch('/add/:username/', tokenUtils.verifyToken, async (req, res) => {
    const usernameLoggedIn = req.params.username;
    const usernameToAdd = req.body.usernameToAdd;

    const userLoggedIn = await User.findOne({ username: usernameLoggedIn });
    const userToAdd = await User.findOne({ username: usernameToAdd });

    if (userLoggedIn && userToAdd) {
        userLoggedIn.favoritesList.push(usernameToAdd);
        await userLoggedIn.save();

        res.status(200).send({
            success: true,
            message: 'Saved user as favorite!',
            user: userLoggedIn,
        })
    } else {
        res.status(404).send({
            success: false,
            message: 'User not found',
        })
    }

});

module.exports = router; 
