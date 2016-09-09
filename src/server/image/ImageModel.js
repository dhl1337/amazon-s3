var mongoose = require('mongoose');
var imageSchema = mongoose.Schema({
    title: { type: String },
    url: { type: String }
});

module.exports = mongoose.model('Image', imageSchema);