import express from "express";
import formidable from "express-formidable";
import { createProductController, deleteProductController, getProductsController, getSingleProductController, productPhotoController, searchProductController, updateProductController } from "../controllers/productController.js";

const router = express.Router();

// routes
router.post("/create-product", formidable(), createProductController);
router.get("/get-products", getProductsController);
router.get("/get-product/:slug", getSingleProductController);
router.delete("/delete-product/:id", deleteProductController);
router.put("/update-product/:id", formidable(), updateProductController)

// get photo
router.get("/product-photo/:pId", productPhotoController);


// search product
router.get("/search/:keyword", searchProductController);


export default router;