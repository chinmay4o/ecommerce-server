import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    
    res.json(products);
});


const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findOne({_id : req.params.id});

    if(product){
        res.json(product);
    } else {
        throw new Error("product not found");
    }
});

export {getProductById, getProducts}