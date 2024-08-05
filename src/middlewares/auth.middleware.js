import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.sub); // Use 'sub' if that is the field used in your JWT payload
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }
    next();
  } catch (err) {
    console.error('Error during authentication:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.admin !== true) return res.status(403).json({ message: 'Access denied' });
  console.log('Admin access granted:', req.user.admin);
  next();
};

// Middleware to check if the user is a retailer
const isRetailer = (req, res, next) => {
  if (!req.user || req.user.admin === true) return res.status(403).json({ message: 'Access denied' });
  console.log('Retailer access granted:', req.user.admin);
  next();
};

export { isAuthenticated, isAdmin, isRetailer };