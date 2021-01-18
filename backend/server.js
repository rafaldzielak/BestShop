import express from "express";
import colors from "colors";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/connectDb.js";
import { errorHandler, notFound } from "./auth/errorMiddleware.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
connectDB();

app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/auth", userRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
if (process.env.NODE_ENV == "production") {
  console.log("PRODUCTION");
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  console.log(__dirname, "frontend", "build", "index.html");
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")));
} else app.get("/", (req, res) => res.send("API RUNNING"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
