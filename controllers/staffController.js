import StaffModel from "../models/staffModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import staffModel from "../models/staffModel.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sahidsiddik0977@gmail.com",
    pass: "uhjr osxb cskd szzi",
  },
});



export const sendRegistrationConfirmationEmail = (email, password) => {
  const loginLink = "http://localhost:3000/login"; // Replace with your actual login page URL
  const mailOptions = {
    from: "Design_Studio",
    to: email,
    subject: "Your are Registered as Staff ",
    html: `
    <p>Welcome to Design Studio Family.</p>
      <p>Your password: ${password}</p>
      <p>Please <a href="${loginLink}">click here</a> to login.</p>
    `,
  };

  
  return transporter.sendMail(mailOptions);
};


export const createStaffMember = async (req, res) => {
  try {
    const { firstname, lastname, address, streetaddress, city, state, country, postal, email, password, phone,expertin } = req.body;

    // Check if any required field is missing or empty
    if (!firstname || !lastname || !address || !streetaddress || !city || !state || !country || !postal || !email || !password || !phone || !expertin ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await StaffModel.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    const user = await new StaffModel({
      firstname,
      lastname,
      address,
      streetaddress,
      city,
      state,
      postal,
      country,
      email,
      phone,
      expertin,
      password: hashedPassword,
    }).save();


// Send registration confirmation email
await sendRegistrationConfirmationEmail(email, password);
    
  
    res.status(201).json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};


// Login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    // Check user
    const staff = await StaffModel.findOne({ email });
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Compare password
    const match = await comparePassword(password, staff.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    // Generate JWT token
    const token = JWT.sign({ _id: staff._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: staff._id,
        firstname: staff.firstname,
        lastname: staff.lastname,
        email: staff.email,
        // Add other user properties as needed
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Protected route test controller
export const testController = (req, res) => {
  res.send("Protected Route");
};

// Get all staff members
export const getAllStaffMembers = async (req, res) => {
  try {
    const staffMembers = await StaffModel.find();
    res.status(200).json({ success: true, data: staffMembers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get staff member by ID
export const getStaffMemberById = async (req, res) => {
  try {
    const staffMember = await StaffModel.findById(req.params.id);
    if (!staffMember) {
      return res.status(404).json({ success: false, message: "Staff member not found" });
    }
    res.status(200).json({ success: true, data: staffMember });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Delete staff member by ID
export const deleteStaffMemberById = async (req, res) => {
  try {
    await StaffModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


//--------------------------------------------------------------------------------profile update

export const updateProfileController = async (req, res) => {
  try {
    const { firstname, lastname, password, address, streetaddress, state, city, postal, country, phone, expertin } = req.body;
    const userId = req.user?._id;
    const user = await staffModel.findById(req.user._id);

    console.log("User ID:", userId); // Debugging log
    console.log("Request Body:", req.body); // Debugging log
    console.log("Found User:", user); // Debugging log

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Validate incoming data
    if (firstname && typeof firstname !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid name format",
      });
    }
    if (lastname && typeof lastname !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid name format",
      });
    }
    if (password && typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid password format',
      });
    }

    if (address && typeof address !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid address format",
      });
    }
    if (streetaddress && typeof streetaddress !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid address format",
      });
    }
    // Validate phone format (e.g., allow only digits, optional dashes, and parentheses)
    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    // Update user properties with the new values
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.password = password ? await hashPassword(password) : user.password;
    user.address = address || user.address;
    user.streetaddress = streetaddress || user.streetaddress;
    user.city = city || user.city;
    user.state = state || user.state;
    user.postal = postal || user.postal;
    user.country = country || user.country;
    user.phone = phone || user.phone;
    user.expertin = expertin || user.expertin;


    const updatedUser = await user.save();
    console.log("Updated User:", updatedUser); // Debugging log

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error:", error); // Debugging log
    res.status(400).send({
      success: false,
      message: "Error While Updating Profile",
      error: error.message, // Include the error message for better debugging
    });
  }
};

// Get all unique expertin values
export const getAllExpertIn = async (req, res) => {
  try {
    const expertIns = await StaffModel.distinct('expertin');
    res.status(200).json({ success: true, data: expertIns });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getStaffByExpertise = async (req, res) => {
  try {
    const { expertise } = req.params;
    const staffMembers = await StaffModel.find({ expertin: expertise });

    if (!staffMembers || staffMembers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No staff members found for this expertise',
      });
    }

    res.status(200).json({
      success: true,
      data: staffMembers,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};