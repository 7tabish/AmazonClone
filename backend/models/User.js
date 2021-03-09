const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        validate: [ isEmail, 'invalid email' ],
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minLength:[6,'Password should have atleast 6 characters']
    },

    orders: [{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
        address:{
            city:{
                type: String,
                required: [true, 'city is required'],
                trim: true,
            },
            country:{
                type: String,
                required: [true, 'country is required'],
                trim: true,
            },
            postalCode:{
                type: String,
                required: [true, 'postal code is required'],
                trim: true,
            },
            street:{
                type: String,
                required: [true, 'street is required'],
                trim: true,
            }
        }

        
    }]
});

module.exports = mongoose.model('User', userSchema);