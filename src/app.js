const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
// require('dotenv').config();
const routes = require('./api/routes/index');
// const errorHandler = require('./api/middlewares/errorHandler');
const errorMiddleware = require('./api/middlewares/error.middleware');
const connectDB = require('./config/mongodb.config');

const app = express();
connectDB(); //Instance mongoose

// Security Middlewares
// app.use(cors()); //CORS - Cross Orgin Resoures
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
  
app.use(helmet()); //Secure - Headers - https,CSP
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(morgan('dev')); //HTTP Logger
app.use(compression());
app.use(bodyParser.json());
app.use(express.json()); //parse JSON body - (important for req.body)
express.urlencoded({ extended: true }) //if you're handling form data


//Routes - SQL Server - MongoDB
app.use('/api', routes);
// app.post('/api/login', (req, res) => {
//     const { username, password } = req.body;
    
//     // Simple validation
//     if (username === 'admin' && password === '1234') {
//       res.json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   });
// Error handling middleware (for any errors)
// app.use(errorHandler);

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;