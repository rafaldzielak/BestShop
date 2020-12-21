import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};
  const sortQuery = req.query.sort || "";
  const sort = { sortQuery: 1 };
  const products = await productModel.find(keyword).sort(sort);
  res.json(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (product) res.json(product);
  else throw new Error("Product not found");
});

export const createProduct = asyncHandler(async (req, res) => {
  const { price, countInStock, name, image, description, brand, category } = req.body;
  const { user } = req;
  console.log(user);

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
  await product.save();

  if (product) res.json(product);
  else throw new Error("Product not found");
});

export const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (product) {
    await product.remove();
    res.status(200).json({ message: "product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
