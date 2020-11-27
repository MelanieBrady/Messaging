const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});
const Message = require('./models/Message');
const appPort = 3001;
const httpPort = 5000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// Mongoose config
mongoose.connect('mongodb://localhost/messaging', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);

// app config goes here :D
app.use(bodyParser.urlencoded({ extended: false }));

// models 
require('./models/User');

// parameters -> routes "/" is an empty route
// second parameter is an function in line declaration 
app.use(require('./controllers'));

io.on('connection', (socket) => {

    socket.on('join', function (data) {
        socket.join(data.chatRoomName); // We are using room of socket io
    });

    socket.on('init', function (data) {
        console.log('init!');
        console.log(data.chatRoomName);
        // Get the last 10 messages from the database.
        Message.find({ chatRoomName: data.chatRoomName }).sort({ createdAt: -1 }).limit(10).exec((err, messages) => {
            if (err) return console.error(err);
            console.log(messages);
            // Send the last messages to the user.
            socket.to('init', messages);
            //socket.to(data.chatRoomName).emit('init', messages);
        });
    });

    // Listen to connected users for a new message.
    socket.on('message', (msg) => {
        // Create a message with the content and the name of the user.
        const message = new Message({
            content: msg.content,
            from: msg.from,
            to: msg.to,
            chatRoomName: msg.chatRoomName,
        });


        // Save the message to the database.
        message.save((err) => {
            if (err) return console.error(err);
        });

        // Notify all other users about a new message.
        // socket.broadcast.emit('push', msg);
        socket.to(msg.chatRoomName).emit('push', msg);
    });
});




// listen to the server - first argument port#, 3000
http.listen(httpPort);
app.listen(appPort);
console.log(`server started on port ${appPort}`); 