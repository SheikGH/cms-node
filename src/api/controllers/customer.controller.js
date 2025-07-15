// File: src/api/controllers/customer.controller.js
// const CustomerService = require('../../application/services/mongo/customer.service');
const CustomerService = require('../../application/services/sql/customer.service');

exports.getAll = async (req, res, next) => {
    try {
        const customers = await CustomerService.getAll();
        res.json(customers);
    }
    catch (err) {
        next(err);
    }
    //res.json({ message: 'Customers List' });
}

exports.getById = async (req, res, next) => {
    try {
        // if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
        //     return res.status(403).json({ message: 'Unauthorized' });
        // }
        const customer = await CustomerService.getById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Not found' });
        res.json(customer);
    }
    catch (err) {
        next(err);
    }
    // const id = req.params('id');
    // res.json({ message: `Customer by id ${id}` });
}

exports.create = async (req, res, next) => {
    try {
        const newCustomer = await CustomerService.create(req.body);
        res.status(201).json(newCustomer); // 201 Created  | Success 
        //res.json({ message: req.body });
    }
    catch (err) {
        res.status(500).json({ message: 'Create failed', error: err.message });
        next(err);
    }
}

exports.update = async (req, res, next) => {
    try {
        const editCustomer = await CustomerService.update(req.params.id, req.body);
        res.json(editCustomer);
    }
    catch (err) {
        res.status(500).json({ message: 'Update failed' });
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try {
        await CustomerService.delete(req.params.id);
        res.status(204).json({ message: 'Deleted successfully' }) // 204 No Content | Success 
    }
    catch (err) {
        res.status(500).json({ message: 'Delete failed' });
        next(err);
    }
}

exports.search = async (req, res) => {
    try {
        const { q } = req.query; // e.g. /search?q=john
        const results = await CustomerService.search(q || '');
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: 'Search failed', error: err.message });
    }
}