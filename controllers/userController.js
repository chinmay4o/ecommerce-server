import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// @desc auth user & get token
// @ post api/user/login
// @ access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    throw new Error("invalid email or password");
  }

  const user = await User.findOne({ email });

  const validatePassword = await bcrypt.compare(password, user.password);

  if (user && validatePassword) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

// @desc REGISTER USERT
// @ post api/users
// @ access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// @desc Get user profile
// @ post api/user/profile
// @ access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json({
    _id: user._id,
    name: user.name,
    password: user.password,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

// @desc update user profile
// @ PUT api/users/profile
// @ access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user) {
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }

    const updatedUser = await user.save();
    console.log(updatedUser);
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("user not found");
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
