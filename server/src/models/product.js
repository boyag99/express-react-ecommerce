const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const productSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxLength: 32,
            text: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            maxLength: 2000,
            text: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            maxLength: 32,
        },
        category: {
            type: ObjectId,
            ref: 'Category',
        },
        subCategories: [
            {
                type: ObjectId,
                ref: 'SubCategory',
            },
        ],
        quantity: Number,
        sold: {
            type: Number,
            default: 0,
        },
        image: Array,
        shipping: {
            type: String,
            enum: ['Yes', 'No'],
        },
        color: {
            type: String,
            enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
        },
        brand: {
            type: String,
            enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
        },
        // ratings: [
        //     {
        //         star: Number,
        //         postedBy: {
        //             type: ObjectId,
        //             ref: 'User',
        //         },
        //     },
        // ],
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
