const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: String,
    from: String,
    to: String,
    chatRoomName: String,

}, {
    timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);