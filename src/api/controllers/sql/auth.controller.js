// File: src/api/controllers/auth.controller.js
// const AuthService = require('../../application/services/mongo/auth.service');
const AuthService = require('../../../application/services/sql/auth.service');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await AuthService.login(req.body);
        // console.log('login::customer:', result,result.length,result[0]);
        const customer = result[0];
        if (!customer) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, customer.Password);
        // console.log('login::isMatch:', customer, isMatch);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = createToken(customer);
        res.status(200).json({ token: token, username: customer.Email, role: customer.Role }); //200 OK | Success
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err.message });
    }
}

exports.register = async (req, res, next) => {
    
    try {
        const check = await AuthService.login(req.body);
        console.log('register::customer:', check,check.length,check[0]);
        if (check.length > 0) return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await AuthService.register(req.body, hashedPassword);
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
            { username: customer.Email, role: customer.Role },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        );
        return token;
    }
    catch (err) {
        console.error('Error in create token', err);
    }

}