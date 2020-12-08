import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.json({ _id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin, token });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await userModel.create({ name, email, password });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({ _id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin, token });
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await userModel.findById(req.user._id);
  if (user) {
    user.name = name || user.name;
    user.password = password || user.password;
  }

  const updatedUser = await user.save();

  if (updatedUser) {
    const token = generateToken(user._id);
    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      token,
    });
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

export { authUser, registerUser, updateProfile };
