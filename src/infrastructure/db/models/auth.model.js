// File: src/core/models/customer.model.js
const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const model = mongoose.model('Auth', authSchema);

module.exports = model