import express from "express";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/connectDb.js";
import productRoute from "./routes/productRoute.js";
const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
connectDB();

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.use("/products", productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
