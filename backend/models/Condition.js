const mongoose = require('mongoose');

const stringType = {type: String, default: '', trim: true}

const conditionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: stringType

  
});

module.exports = mongoose.model('Condition', conditionSchema);