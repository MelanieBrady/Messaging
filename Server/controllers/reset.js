const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('../config.json');
const tokenUtils = require('../auth/token_utils');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const router = express.Router();

// For token authentication 
router.post('/', tokenUtils.verifyToken, async (req, res) => {

    try {
        const user = await User.findOne({ username });

        if (user) {
            const prevPassword = req.body.password;
            const passwordMatches = await bcrypt.compare(prevPassword, user.password);

            if (passwordMatches) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(req.body.newPassword, salt);
                mongoose.user.update({ password });

                await user.save();
                res.status(200).send({ success: true, message: 'Password update', token });
            }
        }
    } catch (e) {
        res.status(500).send({ message: e.message });
    }


});

module.exports = router;

