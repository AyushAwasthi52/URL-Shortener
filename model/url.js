const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    shortID: {
        type: String, 
        required: true, 
        unique: true,
        index: true  // Add index for faster lookups
    },
    redirectedURL: {
        type: String, 
        required: true
    },
    totalClicks: {
        type: Number, 
        required: true, 
        default: 0,
        min: 0  // Ensure clicks can't be negative
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    },
    visitorHistory: [{
        timestamp: {
            type: Date, 
            default: Date.now
        }
    }]
}, {
    timestamps: true,
    versionKey: false  // Disable version key to prevent conflicts
});

// Add compound index for faster queries
URLSchema.index({ shortID: 1, createdBy: 1 });

const URL = mongoose.model('url', URLSchema);
module.exports = URL;