const express = require('express');
const cookieParser = require('cookie-parser');
const urlroute = require('./routes/url');
const authRoute = require('./routes/auth');
const {connecttoMongoDB} = require('./connection');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config({path: "./config.env});

const app = express();

const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'Ayush@1234$#@';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// View engine
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));

// Routes
app.use('/auth', authRoute);
app.use('/url', urlroute);

// Root route - check auth and redirect accordingly
app.get('/', (req, res) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.redirect('/auth/signin');
    }

    try {
        jwt.verify(token, JWT_SECRET);
        res.redirect('/url');
    } catch (error) {
        res.clearCookie('token');
        res.redirect('/auth/signin');
    }
});

// Start server
const startServer = async () => {
    try {
        await connecttoMongoDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/short-url');
        console.log('MongoDB Connected');
        
        app.listen(PORT, () => {
            console.log(`Server started at PORT: ${PORT}`);
            console.log(`Visit http://localhost:${PORT}/auth/signin to get started`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
