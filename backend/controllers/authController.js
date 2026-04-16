const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { registerSchema, loginSchema } = require("../validators/authValidator");
const { successResponse, errorResponse } = require("../utils/apiResponse");

exports.registerUser = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return errorResponse(res, 400, error.details[0].message);
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return errorResponse(res, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return successResponse(res, 201, "User registered successfully", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return errorResponse(res, 400, error.details[0].message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, 400, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, 400, "Invalid credentials");
    }

    const token = generateToken(user._id, user.role);

    return successResponse(res, 200, "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};