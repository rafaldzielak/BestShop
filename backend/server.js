import express from "express";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/connectDb.js";
import { errorHandler, notFound } from "./auth/errorMiddleware.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.use("/api/products", productRoute);
app.use("/api/auth", userRoute);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
