import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// create category
export const categoryController = async(req, res) => {
    try {
        const {name} = req.body;
        if(!name) {
            return res.status(401).send({message: "Name is required"});
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists"
            });
        }
        const category = await new categoryModel({name, slug: slugify(name)}).save();
        res.status(201).send({
            success: true,
            message: "New category created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }
};


// update category 
export const updateCategoryController = async(req, res) => {
    try {
        console.log("we are in the update category section");
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category"
        })
    }
};

// get all category
export const getAllCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Category Called",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in get all category controller",
            error
        })
    }
};

// single category
export const singleCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(500).send({
            success: true,
            message: "Single Category Showed",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in single category",
            error
        })
    }
};

// delete category
export const deleteCategoryController = async(req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Successfully deleted category"

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting category",
            error
        })
    }
};