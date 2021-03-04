const SubCategory = require('../models/subCategory');
const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
    const { name, category } = req.body;
    const slug = slugify(name);

    const currentCategory = await Category.findById(category).exec();

    if (!currentCategory) {
        res.status(400);
    }

    const subCategory = await SubCategory.findOne({ slug }).exec();

    if (subCategory) {
        res.status(400);
    } else {
        const newSubCategory = await SubCategory({
            name,
            slug,
            parent: category,
        }).save();

        res.status(201).json(newSubCategory);
    }
};

exports.read = async (req, res) => {
    const { slug } = req.params;

    try {
        const category = await SubCategory.findOne({ slug }).exec();

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({
                message: `The category could not be found in database.`,
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.update = async (req, res) => {
    const { slug } = req.params;
    const { name } = req.body;
    const newSlug = slugify(name);

    try {
        const category = await SubCategory.findOneAndUpdate(
            { slug },
            { name, slug: newSlug },
            { new: true },
        );

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({
                message: `The category could not be found in database.`,
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.remove = async (req, res) => {
    const { slug } = req.params;

    try {
        const category = await SubCategory.findOneAndDelete({ slug });

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({
                message: `The category could not be found in database.`,
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.list = async (req, res) => {
    try {
        const categories = await SubCategory.find({}).sort({ createAt: -1 });

        if (categories) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({
                message: `The categories could not be found in database.`,
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};
