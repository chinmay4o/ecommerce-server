import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./mongoDB/db.js";
import users from "./data/users.js";
import products from "./data/data.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import colors from "colors";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("data imported".yellow.underline);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.bold);
    process.exit(1);
  }
};

importData();