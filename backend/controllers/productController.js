import userModel from "../models/userModel.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import orderModel from "../models/orderModel.js";

export const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};
  const sortQuery = req.query.sort || "";
  let sort;

  if (sortQuery) {
    let sortDirection = "desc";
    if (sortQuery === "price") sortDirection = "asc";
    sort = [[sortQuery, sortDirection]];
  }
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

  let product;

  let cat = await categoryModel.findOne({ name: category });
  if (!cat) {
    cat = await categoryModel.create({ name: category });
  }

  product = await productModel.create({
    price,
    countInStock,
    name,
    image,
    description,
    brand,
    category: cat,
    user,
  });
  await product.save();

  if (product) res.json(product);
  else throw new Error("Product not found");
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { price, countInStock, name, image, description, brand, category } = req.body;
  const id = req.params.id;
  const { user } = req;

  const product = await productModel.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  let cat;
  if (category) {
    cat = await categoryModel.findOne({ name: category });
    if (!cat) {
      cat = await categoryModel.create({ name: category });
    }
  }

  const updateFields = {
    price: price || product.price,
    countInStock: countInStock === 0 ? 0 : countInStock || product.countInStock,
    name: name || product.name,
    image: image || product.image,
    description: description || product.description,
    brand: brand || product.brand,
    category: cat || product.category,
    user: user || product.user,
  };

  const updateProduct = await productModel.findByIdAndUpdate(id, updateFields);

  if (updateProduct) res.json(updateProduct);
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

export const createReview = asyncHandler(async (req, res) => {
  const { user } = req;
  const { name, rating, comment } = req.body;
  const productId = req.params.id;
  const order = await orderModel.findById(req.params.orderId);
  const product = await productModel.findById(req.params.id);
  let isProductBoughtByUser = false;

  if (product && order && String(order.user) == String(user._id) && order.orderItems) {
    for (const orderItem of order.orderItems) {
      if (orderItem._id == productId) {
        isProductBoughtByUser = true;
        orderItem.isReviewed = true;
        break;
      }
    }
  } else {
    res.status(401);
    throw new Error("Error");
  }

  if (isProductBoughtByUser) {
    const review = { user: user._id, name, rating, comment };
    if (product.reviews.find((review) => review.user.toString() === user._id.toString())) {
      res.status(400);
      throw new Error("Product already reviewed!");
    }
    product.reviews.unshift(review);
    product.numReviews = product.reviews.length;
    // console.log(product.reviews);
    product.rating = product.reviews.reduce((a, b) => a + b.rating, 0) / product.reviews.length;
  } else {
    res.status(201);
    throw new Error("Please buy the product to review it!");
  }
  const updatedProduct = await product.save();
  order.save();
  res.json(updatedProduct);
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryModel.find();
  res.json(categories);
});
