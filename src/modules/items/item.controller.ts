import { Request, Response } from "express";
import Item from "./item.model";
import Category from "../category/category.model";
import { AuthenticatedRequest } from "../../middlewares/auth";

// ─── Create Item ──────────────────────────────────────────────────────────────
export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, image } = req.body;
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    // Create item
    const newItem = new Item({
      name,
      description,
      price,
      category: existingCategory._id,
      image,
      userEmail,
    });

    await newItem.save();

    // Add item to category's items array
    existingCategory.items.push(newItem._id);
    await existingCategory.save();

    return res.status(201).json(newItem);
  } catch (error: any) {
    console.error("Error creating item:", error);
    return res.status(500).json({ error: "Failed to create item" });
  }
};

// ─── Get All Items ────────────────────────────────────────────────────────────
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const filter: any = { userEmail };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.search) {
      filter.name = { $regex: req.query.search as string, $options: "i" };
    }

    const items = await Item.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json(items);
  } catch (error: any) {
    console.error("Error fetching items:", error);
    return res.status(500).json({ error: "Failed to fetch items" });
  }
};

// ─── Get Item by ID ───────────────────────────────────────────────────────────
export const getItemById = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const item = await Item.findOne({ _id: req.params.id, userEmail }).populate("category", "name");

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(item);
  } catch (error: any) {
    console.error("Error fetching item:", error);
    return res.status(500).json({ error: "Failed to fetch item" });
  }
};

// ─── Update Item ──────────────────────────────────────────────────────────────
export const updateItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const updates = req.body;
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const existingItem = await Item.findOne({ _id: itemId, userEmail });
    if (!existingItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    // If category is being updated, we need to move the item between categories
    if (updates.category && updates.category !== existingItem.category.toString()) {
      // Remove from old category
      await Category.findOneAndUpdate({ _id: existingItem.category, userEmail }, {
        $pull: { items: existingItem._id },
      });

      // Add to new category
      const newCategory = await Category.findOne({ _id: updates.category, userEmail });
      if (!newCategory) {
        return res.status(404).json({ error: "New category not found" });
      }
      newCategory.items.push(existingItem._id);
      await newCategory.save();
    }

    const updatedItem = await Item.findOneAndUpdate({ _id: itemId, userEmail }, updates, {
      new: true,
      runValidators: true,
    }).populate("category", "name");

    return res.status(200).json(updatedItem);
  } catch (error: any) {
    console.error("Error updating item:", error);
    return res.status(500).json({ error: "Failed to update item" });
  }
};

// ─── Delete Item ──────────────────────────────────────────────────────────────
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const authReq = req as AuthenticatedRequest;
    const userEmail = authReq.userEmail;

    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const deletedItem = await Item.findOneAndDelete({ _id: itemId, userEmail });

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Remove item from category
    await Category.findOneAndUpdate({ _id: deletedItem.category, userEmail }, {
      $pull: { items: deletedItem._id },
    });

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ error: "Failed to delete item" });
  }
};
