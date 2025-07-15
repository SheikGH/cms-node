// File: src/api/controllers/auth.controller.js
// const AuthService = require('../../application/services/mongo/auth.service');
const AuthService = require('../../../application/services/sql/auth.service');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const customer = await AuthService.login(req.body);
        console.log('login::customer:', customer);
        if (!customer) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await customer.comparePassword(password);
        console.log('login::isMatch:', customer, isMatch);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = createToken(customer);

        res.status(200).json({ token: token, username: customer.email, role: customer.role }); //200 OK  | ✅ Success
    } catch (err) {
        res.status(500).json({ message: 'Login failed' });
        next(err);
    }
}

exports.register = async (req, res, next) => {
    try {
        const exists = await AuthService.login(req.body);
        if (exists) return res.status(400).json({ message: 'User already exists' });
        await AuthService.register(req.body);
        //console.log('register:', req.body, result);
        res.status(201).json({ message: 'User registered successfully' }); // 201 Created  | Success 
    } catch (err) {
        res.status(500).json({ message: 'Registration failed' });
        next(err);
    }
}

const createToken = (customer) => {
    try {
        const token = jwt.sign(
            { username: customer.email, role: customer.role },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        );
        return token;
    }
    catch (err) {
        console.error('Error in create token', err);
    }

}