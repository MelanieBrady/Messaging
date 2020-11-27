const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

// For token authentication 
const secret = config.token.secret;
const expiresInSeconds = config.token.expiresInSeconds;

router.post('/', async (req, res) => {
    try {

        const username = req.body.username;
        const user = await User.findOne({ username });

        if (user) {
            const password = req.body.password;
            const passwordMatches = await bcrypt.compare(password, user.password);

            if (passwordMatches) {
                const token = jwt.sign({ username }, secret, { expiresIn: expiresInSeconds });
                res.status(200).send({ success: true, message: 'Login successful!', token });
                return;
            }
        }

        res.status(401).send({ message: 'Invalid username and/or password.' });


    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router; 
