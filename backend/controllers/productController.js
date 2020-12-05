import userModel from "../models/userModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await userModel.find();
    res.json(products);
  } catch (error) {}
};
