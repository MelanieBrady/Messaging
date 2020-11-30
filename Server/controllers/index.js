// methods for microservices will go here?
const express = require('express');
const router = express.Router();

router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/message', require('./message'));
router.use('/profile', require('./profile'));
router.use('/change', require('./change'));
router.use('/home', require('./home'));
router.use('/favorites', require('./favorites'));

module.exports = router; 
