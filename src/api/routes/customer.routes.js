// File: src/api/routes/customer.routes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const authMiddleware = require('../middlewares/auth.middlewarev1');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { createCustomerValidator } = require('../validators/customer.validator');
const { validate } = require('../middlewares/validate.middleware');

// router.use(authMiddleware);
router.use(authenticate); //Set Authentization to all the customer routes instead of each routes

//Set Authorization to individuals routes based on roles
router.get('/search', customerController.search);
router.get('/', customerController.getAll);
// router.get('/', authenticate, authorize('Admin'), customerController.getAll);
router.get('/:id', authorize('admin', 'user'), customerController.getById);
router.post('/', createCustomerValidator, validate, authorize('admin'), customerController.create);
router.put('/:id',  createCustomerValidator, validate, authorize('admin', 'user'), customerController.update);
router.delete('/:id', authorize('admin',), customerController.delete);

module.exports = router;