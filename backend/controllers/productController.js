import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await userModel.find();
  res.json(products);
});
