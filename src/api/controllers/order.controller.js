// File: src/api/controllers/order.controller.js

const OrderService = require('../../services/order.service');

exports.getAll = async (req, res, next) => {
  try {
    const orders = await OrderService.getAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const order = await OrderService.getById(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newOrder = await OrderService.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updatedOrder = await OrderService.update(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await OrderService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};