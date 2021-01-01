import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import OrderModel from "../models/orderModel.js";
import stripeImp from "stripe";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

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

const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let orders = await OrderModel.find({ user: userId }).sort({ createdAt: -1 });

  for (let order of orders) {
    // orders.forEach(async (order, index) => {
    if (order.paymentMethod === "Stripe" && !order.isPaid) {
      const stripe = stripeImp(process.env.STRIPE_SECRET);
      const session = await stripe.checkout.sessions.retrieve(order.stripeOrderId);
      const paymentStatus = session.payment_status;
      if (paymentStatus === "paid") {
        order.isPaid = true;
        order.save();
      }
    }
  }
  // console.log(orders);
  // orders = await OrderModel.find({ user: userId });

  res.status(201).json(orders);
});

const getAllUsers = asyncHandler(async (req, res) => {
  let users = await userModel.find().sort({ createdAt: -1 });
  res.status(201).json(users);
});

export { authUser, registerUser, updateProfile, getUserOrders, getAllUsers };
