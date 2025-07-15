// File: src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
console.log('JWT_SECRET:', jwtSecret); // ✅ Add this line to debug
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided!' }); //401 Unauthorized - Auth Error
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('authenticate::token::', token,decoded,req.user);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
  // try {
  //   //if (token !== secret) return res.status(403).json({ message: 'Invalid Token!' }); //403 Forbidden - Auth Error
  //   jwt.verify(token, jwtSecret, (err, user) => {
  //     //if (err) return res.sendStatus(403);
  //     if (err) return res.status(403).json({ error: err, message: 'Invalid Token!' }); //403 Forbidden - Auth Error
  //     //req.user = user;
  //     next();
  //   });
  //   //  decoded = jwt.verify(token, JWT_SECRET);
  //   // req.user = decoded;
  //   // next();

  // } catch (err) {
  //   return res.status(403).json({ message: 'Invalid token' });
  // }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };