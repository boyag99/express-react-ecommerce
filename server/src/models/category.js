const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minLength: 3,
            maxLength: 32,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        subCategories: [
            {
                type: ObjectId,
                ref: 'SubCategory',
            },
        ],
    },
    { timestamps: true },
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
