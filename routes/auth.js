const express = require('express');
const { handleSignup, handleSignin, handleSignout } = require('../controllers/auth');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.post('/signup', handleSignup);
router.post('/signin', handleSignin);
router.get('/signout', handleSignout);

module.exports = router; 