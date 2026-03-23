"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItemById = exports.getAllItems = exports.createItem = void 0;
const item_model_1 = __importDefault(require("./item.model"));
const category_model_1 = __importDefault(require("../category/category.model"));
const createItem = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const existingCategory = await category_model_1.default.findById(category);
        if (!existingCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        const newItem = new item_model_1.default({
            name,
            description,
            price,
            category: existingCategory._id,
            image,
            userEmail,
        });
        await newItem.save();
        existingCategory.items.push(newItem._id);
        await existingCategory.save();
        return res.status(201).json(newItem);
    }
    catch (error) {
        console.error("Error creating item:", error);
        return res.status(500).json({ error: "Failed to create item" });
    }
};
exports.createItem = createItem;
const getAllItems = async (req, res) => {
    try {
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const filter = { userEmail };
        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.search) {
            filter.name = { $regex: req.query.search, $options: "i" };
        }
        const items = await item_model_1.default.find(filter)
            .populate("category", "name")
            .sort({ createdAt: -1 });
        return res.status(200).json(items);
    }
    catch (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json({ error: "Failed to fetch items" });
    }
};
exports.getAllItems = getAllItems;
const getItemById = async (req, res) => {
    try {
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const item = await item_model_1.default.findOne({ _id: req.params.id, userEmail }).populate("category", "name");
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        return res.status(200).json(item);
    }
    catch (error) {
        console.error("Error fetching item:", error);
        return res.status(500).json({ error: "Failed to fetch item" });
    }
};
exports.getItemById = getItemById;
const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updates = req.body;
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const existingItem = await item_model_1.default.findOne({ _id: itemId, userEmail });
        if (!existingItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        if (updates.category && updates.category !== existingItem.category.toString()) {
            await category_model_1.default.findOneAndUpdate({ _id: existingItem.category, userEmail }, {
                $pull: { items: existingItem._id },
            });
            const newCategory = await category_model_1.default.findOne({ _id: updates.category, userEmail });
            if (!newCategory) {
                return res.status(404).json({ error: "New category not found" });
            }
            newCategory.items.push(existingItem._id);
            await newCategory.save();
        }
        const updatedItem = await item_model_1.default.findOneAndUpdate({ _id: itemId, userEmail }, updates, {
            new: true,
            runValidators: true,
        }).populate("category", "name");
        return res.status(200).json(updatedItem);
    }
    catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({ error: "Failed to update item" });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const authReq = req;
        const userEmail = authReq.userEmail;
        if (!userEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const deletedItem = await item_model_1.default.findOneAndDelete({ _id: itemId, userEmail });
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        await category_model_1.default.findOneAndUpdate({ _id: deletedItem.category, userEmail }, {
            $pull: { items: deletedItem._id },
        });
        return res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({ error: "Failed to delete item" });
    }
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=item.controller.js.map