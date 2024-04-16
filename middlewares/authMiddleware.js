// authMiddleware.js

import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import staffModel from '../models/staffModel.js';

// authMiddleware.js

// Middleware to validate JWT token
export const requireSignIn = async (req, res, next) => {   
    try {
        // Extract JWT token from Authorization header
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization token is required' });
        }
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user information to request object
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error); // Log the error to the console
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};


// Middleware to check if user is an admin
export const isAdmin = async (req, res, next) => {
    try {
        // Fetch user from database using user ID from JWT token
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        // Check if user is an admin (role '1')
        if (user.role === '0') { // Allow users with role '0' (non-admin) to proceed
            return next();
        } else if (user.role !== '1') { // Block admins (role '1')
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }
        // User is admin, proceed to next middleware
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



// Middleware to check if user is a staff member
export const isStaff = async (req, res, next) => {
    try {
        // Fetch user from database using user ID from JWT token
        const user = await staffModel.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        // Check if user is a staff member
        if (user.role !== '2') {
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }
        // User is a staff member, proceed to next middleware
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
