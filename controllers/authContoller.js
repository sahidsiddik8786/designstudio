import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

//const emailUser = "sahidsiddik0977@gmail.com";
//const emailPassword = "";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sahidsiddik0977@gmail.com",
    pass: "uhjr osxb cskd szzi",
  },
});

export const registerContoller = async (req, res) => {
  try {
    console.log("Received registration request #########");
    const { firstname, lastname, address,  streetaddress, city, state, postal, email, password, phone} = req.body;


    //check User
    const exsistingUser = await userModel.findOne({ email: email });
    //Exsisting user ?
    if (exsistingUser) {
      return res.status(200).send({
        success: false,
        message: "Alredy Registerd , please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      return res.status(500).send({
        success: false,
        message: "Error in hashing password",
      });
    }

    //save
    const user = await new userModel({
      firstname,
      lastname,
      address,
      streetaddress,
      city,
      state,
      postal,
      email,
      phone,
      password: hashedPassword,
    }).save();

    const mailOptions = {
      from: "Design_Studio",
      to: email,
      subject: "Registration Confirmation",
      text: "You have been successfully registered.",
    };

    res.status(200).send({
      success: true,
      message: "Registered Successfully",
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email not sent: " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error in registration: ########", error);
    console.log(error);
    res.status(500).send({
      success: false,
      messsage: "Error in Registration",
      error,
    });
  }
};

//export default { registerContoller };

//POST - LOGIN----------------------------------------------------------------

// POST - LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    if (!user.active) {
      return res.status(403).json({
        success: false,
        message: "User is deactivated and cannot log in",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        streetaddress: user.streetaddress,
        city: user.city,
        state: user.state,
        postal: user.postal,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// TEST CONTROLLER
export const testController = (req, res) => {
  res.send("Protected Route");
};

//--------------------------------------------------------------------------------profile update

export const updateProfileController = async (req, res) => {
  try {
    const { firstname, lastname, password, address, streetaddress, state, city,postal, phone } = req.body;
    const user = await userModel.findById(req.user._id);

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

    // Add validation for password
if (password && typeof password !== 'string') {
  return res.status(400).json({
      success: false,
      message: 'Invalid password format',
  });
}

// Update user's password if provided
if (password) {
  user.password = await hashPassword(password);
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
    user.phone = phone || user.phone;

    const updatedUser = await user.save();
    console.log("Updated User:", updatedUser); // Debugging log

// Send email notification
const mailOptions = {
  from: "",
  to: updatedUser.email,
  subject: "Password Updated",
  text: "Your password has been successfully updated.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Email not sent: " + error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

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


//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
