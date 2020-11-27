const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.body.username);
    res.send('hello world! :)');
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.username;
        const email = req.body.email;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            firstName,
            lastName,
            email,
            username,
            password,
        });

        await user.save();
        res.status(201).send({ message: 'user created' });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }

});

module.exports = router; 
