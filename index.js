import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// configure env
dotenv.config();

// database config
connectDB();

// res object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/app/v1/auth", authRoutes);
app.use("/app/v1/category", categoryRoutes);
app.use("/app/v1/product", productRoutes);
app.use("/app/v1/payment", paymentRoutes)

// rest api 
app.get("/", (req, res) => {
    res.send({
        message: "Welcome to e-commerce website"
    })
})

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})