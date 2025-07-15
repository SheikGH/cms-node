// File: src/api/controllers/product.controller.js

const ProductService = require('../../services/product.service');

exports.getAll = async (req, res, next) => {
  try {
    const products = await ProductService.getAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await ProductService.getById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newProduct = await ProductService.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updatedProduct = await ProductService.update(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await ProductService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};