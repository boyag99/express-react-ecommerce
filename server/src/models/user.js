const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true
    },
    picture: String,
    role: {
        type: String,
        default: 'subscriber'
    },
    cart: {
        type: Array,
        default: []
    },
    address: String,
    // wishlist: [{
    //     type: ObjectId,
    //     ref: 'Product'
    // }]
}, { timestamp: true });

module.exports = mongoose.model('User', userSchema);