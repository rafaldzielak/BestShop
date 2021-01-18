import asyncHandler from "express-async-handler";
import categoryModel from "../models/categoryModel.js";
const queryResultsMiddleware = (model, populate) =>
  asyncHandler(async (req, res, next) => {
    // console.log(populate);
    //, hidden: false
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};
    const categoryId = req.query.category || "";
    // const category = categoryId ? await categoryModel.find({ parents: categoryId }) : "";
    const category = categoryId
      ? await categoryModel.find({ $or: [{ parents: categoryId }, { _id: categoryId }] })
      : "";
    const categoryObj = category ? { category } : {};
    const sortQuery = req.query.sort || "";
    let hiddenObj = {};
    if (req.query.hidden === "false") hiddenObj.hidden = false;
    const searchQuery = { ...keyword, ...hiddenObj, ...categoryObj };

    let sort;
    if (sortQuery) {
      let sortDirection = "desc";
      if (sortQuery === "price") sortDirection = "asc";
      sort = [[sortQuery, sortDirection]];
    }
    let query = model.find(searchQuery).sort(sort);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = page * limit - limit;
    // console.log(startIndex);
    const endIndex = page * limit;
    const total = await model.countDocuments(query);

    query = query.skip(startIndex).limit(limit);
    if (populate) query.populate(populate.category, category.fields);

    const results = await query;

    const pagination = { page, limit, total, count: results.length };
    if (endIndex < total) pagination.next = page + 1;
    if (startIndex > 0) pagination.prev = page - 1;
    // const returnObj = { ...pagination, ...results, count: results.length };
    res.queryResults = { pagination, data: results };
    // res.queryResults = { ...returnObj };
    next();
  });
export default queryResultsMiddleware;
