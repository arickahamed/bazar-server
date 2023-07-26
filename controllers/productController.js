import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";

export const createProductController = async (req, res) => {
    console.log(req.fields);
    try {
        const { name, slug, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: "Name is required" });
            case !description:
                return res
                    .status(500)
                    .send({ message: "Description is required" });
            case !price:
                return res.status(500).send({ message: "Price is required" });
            case !category:
                return res
                    .status(500)
                    .send({ message: "Category is required" });
            case !quantity:
                return res
                    .status(500)
                    .send({ message: "Quantity is required" });
            case photo && photo > 1000000:
                return res
                    .status(500)
                    .send({
                        message:
                            "Photo is required and should be less than 1mb",
                    });
        }

        const products = new productModel({
            ...req.fields,
            slug: slugify(name),
        });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "successfully created the product",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error,
        });
    }
};

// get all products
export const getProductsController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "All products",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error,
        });
    }
};

// single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error getting single product",
            error,
        });
    }
};

// product photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel
            .findById(req.params.pId)
            .select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in product photo",
            error,
        });
    }
};

// delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error deleting product",
            error,
        });
    }
};

// update product
export const updateProductController = async (req, res) => {
    console.log(req.fields);
    try {
        const { name, slug, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: "Name is required" });
            case !description:
                return res
                    .status(500)
                    .send({ message: "Description is required" });
            case !price:
                return res.status(500).send({ message: "Price is required" });
            case !category:
                return res
                    .status(500)
                    .send({ message: "Category is required" });
            case !quantity:
                return res
                    .status(500)
                    .send({ message: "Quantity is required" });
            case photo && photo > 1000000:
                return res
                    .status(500)
                    .send({
                        message:
                            "Photo is required and should be less than 1mb",
                    });
        }

        const products = await productModel.findByIdAndUpdate(req.params.id, {...req.fields, slug: slugify(name)}, {new: true});
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "successfully updated the product",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating product",
            error,
        });
    }
};


// search Product Controller
export const searchProductController = async(req, res) => {
    try {
        const {keyword} = req.params;
        const results = await productModel.find({
            $or: [
                {name: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
            ]
        }).select("-photo")
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in search product api",
            error
        })
    }
}