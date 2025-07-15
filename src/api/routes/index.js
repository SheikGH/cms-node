const express = require('express');
const router = express.Router();

const exampleRoutes = require('./example.routes');
const authRoutes = require('./auth.routes');
const customerRoutes = require('./customer.routes');

router.use('/example', exampleRoutes);
router.use('/auth', authRoutes);  // /api/auth/login, /api/auth/register
router.use('/customers', customerRoutes); // /api/customers

module.exports = router;