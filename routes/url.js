const express = require('express');
const { handleURLShortner, handleRedirect, handleGetURLs } = require('../controllers/url');
const { restrictToLoggedinUserOnly } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.use(restrictToLoggedinUserOnly);
router.get('/', handleGetURLs);
router.post('/', handleURLShortner);

// Public route for redirects
router.get('/:id', handleRedirect);

module.exports = router;