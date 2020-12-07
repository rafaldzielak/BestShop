import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

const adminProtect = asyncHandler(async (req, res, next) => {
  const { user } = req;
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized - not an admin");
  }
});

export default adminProtect;
