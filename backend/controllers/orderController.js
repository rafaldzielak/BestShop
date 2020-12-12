import asyncHandler from "express-async-handler";
import OrderModel from "../models/orderModel.js";

const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    shippingPrice,
    totalPrice,
    name,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No items in the order!");
  }
  const order = await OrderModel.create({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    shippingPrice,
    totalPrice,
    name,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const getOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.id;

  const order = await OrderModel.findById(orderId);

  if (!order) {
    res.status(400);
    throw new Error("No such order!");
  }
  if (userId != String(order.user)) {
    res.status(401);
    throw new Error("Not authorized!");
  }
  res.status(201).json(order);
});

export { placeOrder, getOrder };
