const mongoose = require('mongoose');
const Product = require('../models/product');
const isValidProduct = require('../validations/product');

const filters = {
    title: (title) => {
        return { 'title': { $regex: new RegExp(title, 'i') } };
    }
};

exports.create = (req, res) => {
    let validationProduct = isValidProduct(req.body, 'add');
    if (validationProduct.status === 'success') {
        let product = new Product({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            photos: req.body.photos,
            category: req.body.category,
            price: req.body.price,
            percentageDiscount: req.body.percentageDiscount,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    
        product.save()
        .then(result => {
            res.status(201).json({ message: 'Product created', result: result });
        })
        .catch(err => res.status(500).json({ error: err }));
    }else{
        res.status(400).json({ error: JSON.parse(validationProduct.error)});
    }
};

exports.findProducts = (req, res) => {
    let {title, indexof, limit} = req.query;

    if (title){
        Product.find(filters.title(title))
        .sort({updatedAt: -1})
        .exec()
        .then(products => res.status(200).json(products))
        .catch(err => res.status(500).json({ error: err }));   
    }else{
        Product.find()
        .exec()
        .then(products => res.status(200).json(products))
        .catch(err => res.status(500).json({ error: err }));
    }
};

exports.findProductById = (req, res) => {
    Product.findOne({ _id: req.params.id })
    .exec()
    .then(products => res.status(200).json(products))
    .catch(err => res.status(500).json({ error: err }));
};

exports.update = (req, res) => {
    let validationProduct = isValidProduct(req.body, 'update');
    if (validationProduct.status === 'success') {
        const updateOps = {
            'title': req.body.title,
            'price': req.body.price,
            'percentageDiscount': req.body.percentageDiscount,
            'category': req.body.category,
            'photos': req.body.photos,
            'updatedAt': new Date()
        };
    
        Product.update({ _id: req.params.id }, { $set: updateOps })
        .then(res.status(202).json({ message: 'Updated' }))
        .catch(err => res.status(500).json({ error: err }));
    }else{
        res.status(400).json({ error: JSON.parse(validationProduct.error)});
    }
};

exports.delete = (req, res) => {
    Product.find({ _id: req.params.id })
    .remove()
    .exec()
    .then(res.status(202).json({message: 'Deleted'}))
    .catch(err => res.status(500).json({ error: err }));
};