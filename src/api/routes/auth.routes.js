const express = require('express');
const router = express.Router();
// const AuthController = require('../controllers/auth.controller');
const AuthController = require('../controllers/sql/auth.controller');
const { createLoginValidator } = require('../validators/login.validator');
const { createCustomerValidator } = require('../validators/customer.validator');
const { validate } = require('../middlewares/validate.middleware');

// router.post('/login', AuthController.login);
// router.post('/register', AuthController.register);
router.post('/login', createLoginValidator, validate, AuthController.login);
router.post('/register', createCustomerValidator, validate, AuthController.register);

module.exports = router;