const mongoose = require('mongoose');

const stringType = {type: String, default: '', trim: true}

const brandSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: stringType
});

module.exports = mongoose.model('Brand', brandSchema);