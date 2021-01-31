import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

const adminProtect = asyncHandler(async (req, res, next) => {
  const { user } = req;
  if (user) {
    const userFromDB = await userModel.findById(user._id);
    if (userFromDB?.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized - not an admin");
    }
  }
});

export default adminProtect;
