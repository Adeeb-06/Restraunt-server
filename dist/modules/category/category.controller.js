"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const existingCategory = await category_model_1.default.findOne({ name, userEmail });
        if (existingCategory) {
            return res.status(400).json({ error: "Category name already exists" });
        }
        const newCategory = new category_model_1.default({
            name,
            userEmail
        });
        await newCategory.save();
        return res.status(201).json(newCategory);
    }
    catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ error: "Failed to create category" });
    }
};
exports.createCategory = createCategory;
const getAllCategories = async (req, res) => {
    try {
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const categories = await category_model_1.default.find({ userEmail }).sort({ createdAt: -1 });
        return res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ error: "Failed to fetch categories" });
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const category = await category_model_1.default.findOne({ _id: categoryId, userEmail });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json(category);
    }
    catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({ error: "Failed to fetch category" });
    }
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const name = req.body.name;
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const updatedCategory = await category_model_1.default.findOneAndUpdate({ _id: categoryId, userEmail }, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json(updatedCategory);
    }
    catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({ error: "Failed to update category" });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const deletedCategory = await category_model_1.default.findOneAndDelete({ _id: categoryId, userEmail });
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ error: "Failed to delete category" });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map