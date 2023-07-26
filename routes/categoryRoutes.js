import express from "express";
import { categoryController, deleteCategoryController, getAllCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// routes
router.post("/create-category", categoryController);
router.get("/get-category", getAllCategoryController);
router.get("/single-category/:slug", singleCategoryController);
router.put("/update-category/:id", updateCategoryController);
router.delete("/delete-category/:id", deleteCategoryController);

export default router;