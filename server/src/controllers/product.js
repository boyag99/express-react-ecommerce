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
        console.log(error);
        res.status(400).send('Create product failed');
    }
};

exports.read = async (req, res) => {};

exports.update = async (req, res) => {};

exports.remove = async (req, res) => {};

exports.list = async (req, res) => {};
