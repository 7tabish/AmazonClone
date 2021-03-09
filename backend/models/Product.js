const mongoose = require('mongoose');
const Brand = require('./Brand');


const stringType = {type: String, default: '', trim: true}

const productSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            title: stringType,
            price: Number,
            description: stringType,
            imageUrl: stringType,
            
            brandId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Brand'
            },
            conditionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Condition'
            },
                

});


module.exports = mongoose.model('Product', productSchema);