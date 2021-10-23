import express from "express";
// import products from "./data/data.js";
import dotenv from "dotenv";
import connectDB from "./mongoDB/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import {notFound , errorHandler} from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
dotenv.config();

connectDB();

// middleware
app.use((req,res,next) => {
    console.log(req.originalUrl);
    next();
});

app.get("/" , (req , res) => {
    res.send("api in running...")
});

app.use("/api/products" , productRoutes);
app.use("/api/users" , userRoutes);
app.use("/api/orders" , orderRoutes);

app.use(notFound);
app.use(errorHandler);
// const PORT = process.env.PORT || 5000
const PORT = process.env.PORT

app.listen(PORT , () => {
    console.log('listening on port 5000'.yellow.underline)
});