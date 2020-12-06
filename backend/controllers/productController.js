import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (product) res.json(product);
  else throw new Error("Product not found");
});

export const createProduct = asyncHandler(async (req, res) => {
  const { price, countInStock, name, image, description, brand, category, user } = req.body;

  const product = await productModel.create({
    price,
    countInStock,
    name,
    image,
    description,
    brand,
    category,
    user,
  });
  product.save();
  res.json(product);

  if (product) res.json(product);
  else throw new Error("Product not found");
});
