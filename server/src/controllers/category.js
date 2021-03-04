const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name);

    const category = await Category.findOne({ slug }).exec();

    if (category) {
        res.status(400).json({
            err: `Category with name ${name} already exists`,
        });
    } else {
        const newCategory = await Category({
            name,
            slug,
        }).save();

        res.status(201).json(newCategory);
    }
};

exports.read = async (req, res) => {
    const { slug } = req.params;

    try {
        const category = await Category.findOne({ slug }).exec();

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
        const category = await Category.findOneAndUpdate(
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
        const category = await Category.findOneAndDelete({ slug });

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
        const categories = await Category.find({}).sort({ createAt: -1 });

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
