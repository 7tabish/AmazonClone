const mongoose = require('mongoose');

const stringType = {type: String, default: '', trim: true}

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    main_category: stringType,
    main_imageUrl: stringType,
    sub_categories: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: stringType,
            products: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }]

        }]//end sub_categories
});

module.exports = mongoose.model('Category', categorySchema);