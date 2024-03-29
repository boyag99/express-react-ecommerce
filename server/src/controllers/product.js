const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    delete req.body.colors;
    delete req.body.brands;
    req.body.slug = slugify(req.body.title);
    try {
        const newProduct = await Product(req.body).save();

        res.status(200).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.read = async (req, res) => {
    const { slug } = req.params;

    try {
        const product = await Product.findOne({ slug })
            .populate('category')
            .populate('subCategories');

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.update = async (req, res) => {
    const { slug } = req.params;
    req.body.slug = slugify(req.body.title);
    try {
        const product = await Product.findOneAndUpdate({ slug }, req.body, {
            new: true,
        }).exec();

        res.json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.remove = async (req, res) => {
    const { slug } = req.params;

    try {
        const product = await Product.findOneAndDelete({ slug });

        res.json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.list = async (req, res) => {
    const count = parseInt(req.params.count);
    try {
        const products = await Product.find({})
            .limit(count)
            .populate('category')
            .populate('subCategories')
            .sort([['createdAt', 'desc']])
            .exec();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
