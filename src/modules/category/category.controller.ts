import { Request, Response } from "express";
import Category from "./category.model";
import { AuthenticatedRequest } from "../../middlewares/auth";

// ─── Create Category ──────────────────────────────────────────────────────────
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const existingCategory = await Category.findOne({ name, userEmail });
    if (existingCategory) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    const newCategory = new Category({
      name,
      userEmail
    });

    await newCategory.save();
    return res.status(201).json(newCategory);
  } catch (error: any) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Failed to create category" });
  }
};

// ─── Get All Categories ────────────────────────────────────────────────────────
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const categories = await Category.find({ userEmail }).sort({ createdAt: -1 });
    return res.status(200).json(categories);
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// ─── Get Category by ID ────────────────────────────────────────────────────────
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const category = await Category.findOne({ _id: categoryId, userEmail });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error: any) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ error: "Failed to fetch category" });
  }
};

// ─── Update Category ──────────────────────────────────────────────────────────
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const name = req.body.name;
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId, userEmail },
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(updatedCategory);
  } catch (error: any) {
    console.error("Error updating category:", error);
    return res.status(500).json({ error: "Failed to update category" });
  }
};

// ─── Delete Category ──────────────────────────────────────────────────────────
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const deletedCategory = await Category.findOneAndDelete({ _id: categoryId, userEmail });

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ error: "Failed to delete category" });
  }
};
