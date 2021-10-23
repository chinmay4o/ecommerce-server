import express from 'express';
import {getProducts, getProductById} from "../controllers/productController.js"


const router = express.Router();

//fetch all products-get/api/products-public
router.route("/").get(getProducts);

//fetch single product-get/api/products/:id-public
router.route("/:id").get(getProductById);


//fetch single product-get/api/products/:id-public
// router.get("/:id" , async (req, res) => {
//     try {
//         const product = await Product.findOne({_id : req.params.id});
//         res.json(product);

//     } catch (error) {
//         res.status(404).json({message: "Product not found"});
//     }
// });


export default router;