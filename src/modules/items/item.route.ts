import { Router } from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from "./item.controller";
import { verifyAuth } from "../../middlewares/auth";
import { isOwner } from "../../middlewares/isOwner";

const itemRouter = Router();

// Public/Protected routes
itemRouter.get("/", verifyAuth, getAllItems);
itemRouter.get("/:id", getItemById);

// Protected routes (Owner only for managing items)
itemRouter.post("/create", verifyAuth, isOwner, createItem);
itemRouter.put("/:id", verifyAuth, isOwner, updateItem);
itemRouter.delete("/:id", verifyAuth, isOwner, deleteItem);

export default itemRouter;
