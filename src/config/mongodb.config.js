// File: src/config/db.config.js
const mongoose = require('mongoose');
// console.log('MONGO_URI:',process.env.MONGO_URI);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(err);
        process.exit(1);
    }
}
// console.log('connectDB:',connectDB);
module.exports = connectDB;