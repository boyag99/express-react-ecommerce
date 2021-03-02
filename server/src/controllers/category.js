const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name);

    try {
        const newCategory = await new Category({ 
            name, 
            slug 
        }).save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.read = (req, res) => {

}

exports.update = (req, res) => {

}

exports.remove = (req, res) => {

}

exports.list = (req, res) => {

}