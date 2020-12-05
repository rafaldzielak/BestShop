import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./backend/data/users.js";
import products from "./backend/data/products.js";
import User from "./backend/models/userModel.js";
import Product from "./backend/models/productModel.js";
// import Order from "./models/orderModel.js";
import connectDB from "./backend/config/connectDb.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    // console.log(products);
    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error("Something went wrong: " + error);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error("Something went wrong" + error.red);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
