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
  console.log(orderItems);

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

export { placeOrder };
