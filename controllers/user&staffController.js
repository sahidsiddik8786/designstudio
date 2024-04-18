// authController.js
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import staffModel from '../models/staffModel.js';

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    
    // Check user in both user and staff models
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await staffModel.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.active) {
      return res.status(403).json({
        success: false,
        message: "User is deactivated and cannot log in",
      });
    }

    // Compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        streetaddress: user.streetaddress,
        city: user.city,
        state: user.state,
        country: user.country,
        postal: user.postal,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
