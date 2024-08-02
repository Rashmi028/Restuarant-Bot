require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const http = require('http');
const socketio = require('socket.io');
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurants');
const menuRoutes = require('./routes/menus');
const reservationRoutes = require('./routes/reservations');
const orderRoutes = require('./routes/orders');
const errorMiddleware = require('./middleware/error');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/menus', menuRoutes);
app.use('/reservations', reservationRoutes);
app.use('/orders', orderRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Socket.io setup
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', (orderId) => {
        socket.join(orderId);
    });

    socket.on('orderStatus', (orderId, status) => {
        io.to(orderId).emit('orderStatus', status);
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
