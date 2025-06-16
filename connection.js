const mongoose = require('mongoose');

async function connecttoMongoDB(url){
    mongoose.connect(url);
}

module.exports = { connecttoMongoDB };