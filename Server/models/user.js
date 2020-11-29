const mongoose = require('mongoose')

// make username specific stuff -> https://stackoverflow.com/questions/28829912/mongoose-schema-set-max-length-for-a-string
// https://mongoosejs.com/docs/schematypes.html?fbclid=IwAR2A865TuZAMJYvsKf9jXELODNcHSx2G5A-UAiSiZKNvvwEBqL7r0uX1qGQ
const User = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    friendsList: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('User', User); 