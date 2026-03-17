import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.controller";
import { verifyAuth } from "../../middlewares/auth";
import { isOwner } from "../../middlewares/isOwner";

const categoryRouter = Router();

// Public/Protected routes
categoryRouter.get("/", verifyAuth, getAllCategories);
categoryRouter.get("/:id", getCategoryById);

// Protected routes (Owner only for managing categories)
categoryRouter.post("/", verifyAuth, isOwner, createCategory);
categoryRouter.put("/:id", verifyAuth, isOwner, updateCategory);
categoryRouter.delete("/:id", verifyAuth, isOwner, deleteCategory);

export default categoryRouter;
