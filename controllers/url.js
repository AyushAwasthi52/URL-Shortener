const {nanoid} = require('nanoid');
const URL = require('../model/url');

async function handleURLShortner(req, res){
    const body = req.body;
    if (!body.url) {
        const urls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        return res.render("home", { urls, error: 'URL is required' });
    }
    
    const shortID = nanoid(8);
    await URL.create({
        shortID: shortID,
        redirectedURL: body.url,
        createdBy: req.user._id,
        visitorHistory: []
    });

    // Get all URLs for the current user
    const urls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.render("home", { id: shortID, urls });
}

async function handleRedirect(req, res){
    const shortID = req.params.id;
    
    try {
        // Use findOneAndUpdate with atomic operations
        const result = await URL.findOneAndUpdate(
            { shortID: shortID },
            { 
                $inc: { totalClicks: 1 },
                $push: { 
                    visitorHistory: { 
                        timestamp: new Date() 
                    } 
                }
            },
            { 
                new: true,  // Return the updated document
                runValidators: true,  // Run schema validators
                upsert: false  // Don't create if doesn't exist
            }
        );

        if (!result) {
            return res.status(404).send('URL not found');
        }

        return res.redirect(result.redirectedURL);
    } catch (error) {
        console.error('Redirect error:', error);
        return res.status(500).send('Server error');
    }
}

async function handleGetURLs(req, res) {
    try {
        const urls = await URL.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 })
            .lean();  // Use lean() for better performance
        return res.render("home", { urls: urls || [] });
    } catch (error) {
        console.error('Get URLs error:', error);
        return res.render("home", { urls: [], error: 'Failed to fetch URLs' });
    }
}

module.exports = {
    handleURLShortner,
    handleRedirect,
    handleGetURLs
}