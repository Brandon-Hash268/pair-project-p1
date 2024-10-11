const express = require('express');
const app = express();
const port = 3000;
const session = require("express-session");
const { Server } = require('socket.io');

// Set up view engine and middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: true }
}));

// Import routes
const router = require('./routes');
app.use(router);

// Start the server
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Initialize Socket.IO and set it globally
const io = new Server(server);
global.io = io;

// Listen for socket connections
io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);

    // Example of emitting a notification
    socket.emit('notification', 'Welcome to the Stock Page!');

    // Example of broadcasting a notification to all clients
    socket.on('send-notification', (message) => {
        io.emit('notification', message); // Broadcast to all clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

module.exports = app;
