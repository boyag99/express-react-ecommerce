const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const subCategorySchema = new Schema(
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
        parent: {
            type: ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    { timestamps: true },
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
