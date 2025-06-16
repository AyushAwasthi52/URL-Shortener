const jwt = require('jsonwebtoken');
const User = require('../model/user');

const JWT_SECRET = 'Ayush@1234$#@'; // In production, use environment variable

async function handleSignup(req, res) {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signup', { error: 'Email already exists' });
        }

        const user = await User.create({ email, password });
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/url');
    } catch (error) {
        res.render('signup', { error: 'Something went wrong' });
    }
}

async function handleSignin(req, res) {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('signin', { error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('signin', { error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/url');
    } catch (error) {
        res.render('signin', { error: 'Something went wrong' });
    }
}

function handleSignout(req, res) {
    res.clearCookie('token');
    res.redirect('/auth/signin');
}

module.exports = {
    handleSignup,
    handleSignin,
    handleSignout
}; 