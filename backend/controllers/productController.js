import userModel from "../models/userModel.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import orderModel from "../models/orderModel.js";
import axios from "axios";

export const getProducts = asyncHandler(async (req, res) => {
  //, hidden: false
  // const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};
  // const categoryId = req.query.category || "";
  // // const category = categoryId ? await categoryModel.find({ parents: categoryId }) : "";
  // const category = categoryId
  //   ? await categoryModel.find({ $or: [{ parents: categoryId }, { _id: categoryId }] })
  //   : "";
  // const categoryObj = category ? { category } : {};
  // const sortQuery = req.query.sort || "";
  // let hiddenObj = {};
  // if (req.query.hidden === "false") hiddenObj.hidden = false;
  // const searchQuery = { ...keyword, ...hiddenObj, ...categoryObj };

  // let sort;
  // if (sortQuery) {
  //   let sortDirection = "desc";
  //   if (sortQuery === "price") sortDirection = "asc";
  //   sort = [[sortQuery, sortDirection]];
  // }
  // let query = productModel.find(searchQuery).sort(sort);

  // const products = await productModel.find(searchQuery).sort(sort);
  // const products = await paginateResults(query)
  res.json(res.queryResults);
  // res.json(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id).populate("category", "name");
  if (product) res.json(product);
  else throw new Error("Product not found");
});

export const createProduct = asyncHandler(async (req, res) => {
  const { price, countInStock, name, image, description, brand, category } = req.body;
  const { user } = req;

  let product;

  // let cat = await categoryModel.assignOrCreateCategory(category, null);
  let cat = await categoryModel.findById(category);

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
  const { price, countInStock, name, image, description, brand, category, hidden } = req.body;
  const id = req.params.id;
  const { user } = req;

  const product = await productModel.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  let cat;
  if (category) {
    // cat = await categoryModel.assignOrCreateCategory(category, null);
    cat = await categoryModel.findById(category);
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
    hidden: hidden === false ? false : hidden || product.hidden,
  };

  const updateProduct = await productModel.findByIdAndUpdate(id, updateFields);

  if (updateProduct) res.json(updateProduct);
  else throw new Error("Product not found");
});

export const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (product) {
    product.hidden = true;
    await product.save();
    res.status(200).json({ message: "Product removed" });
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
  const level = req.query.level;
  const parent = req.query.parent;
  const searchQuery = {};
  if (level) searchQuery.level = level;
  if (parent) searchQuery.parent = parent;

  const categories = await categoryModel
    .find(searchQuery)
    .populate("parents")
    .select("-subcategories")
    .sort("name");
  res.json(categories);
});

export const getCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await categoryModel
    .findById(id)
    .populate({ path: "subcategories", select: "name", options: { sort: "name" } })
    .populate("parents", "name")
    .sort("subcategories");
  res.json(category);
});

export const createCategory = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const parentId = req.body.parentId;
  const name = req.body.name;
  const parentCategory = parentId
    ? await categoryModel.findById(parentId).populate("subcategories", "name")
    : null;
  if (parentId) {
    if (!parentCategory) {
      res.status(404);
      throw new Error("Parent Category does not exist!");
    }
    parentCategory.subcategories.forEach((subCategory) => {
      if (subCategory.name === name) {
        res.status(401);
        throw new Error("Category already exists!");
      }
    });
  }

  let parents = parentCategory ? [parentCategory, ...parentCategory.parents] : [];
  const createdCategory = await categoryModel.create({
    name,
    parents,
    level: parents.length,
    subcategories: [],
  });
  if (parentCategory) {
    parentCategory.subcategories.push(createdCategory);
    await parentCategory.save();
  }

  res.json(createdCategory);
});

export const removeCategoryWithSubcategories = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // const category = await categoryModel.findById(id);

  await removeCategoryFromDb(id);

  res.json("success");
});

const removeCategoryFromDb = async (id) => {
  const category = await categoryModel.findById(id);
  for (let subId of category.subcategories) await removeCategoryFromDb(subId);
  const parentCat = category.parents[0] ? await categoryModel.findById(category.parents[0]) : null;
  if (parentCat) {
    parentCat.subcategories = parentCat.subcategories.filter(
      (id) => id.toString() !== category._id.toString()
    );
    await parentCat.save();
  }
  await category.remove();
};
