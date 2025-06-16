const jwt = require('jsonwebtoken');
const User = require('../model/user');

const JWT_SECRET = 'Ayush@1234$#@'; // Should match the one in auth controller

async function restrictToLoggedinUserOnly(req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
        return res.redirect('/signin');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.redirect('/signin');
        }

        req.user = user;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/signin');
    }
}

module.exports = {
    restrictToLoggedinUserOnly
}; 