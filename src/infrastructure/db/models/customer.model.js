// File: src/core/models/customer.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
    customerId: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    address: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
    // customerId: { type: String, unique: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // phone: { type: String },
    // address: { type: String },
    // password: { type: String, required: true },
    // role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

customerSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

customerSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Customer', customerSchema);
