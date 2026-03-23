"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = void 0;
const category_model_1 = __importDefault(require("../category/category.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const item_model_1 = __importDefault(require("../items/item.model"));
const getMenu = async (req, res) => {
    try {
        const { restrauntName } = req.query;
        if (!restrauntName) {
            return res.status(401).json({ error: "No Restraunt Found" });
        }
        const resEmail = await user_model_1.default.findOne({
            restrauntName: { $regex: `^${restrauntName.trim()}$`, $options: "i" },
        });
        if (!resEmail) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        const categories = await category_model_1.default.find({ userEmail: resEmail.email });
        const menu = await Promise.all(categories.map(async (category) => {
            const items = await item_model_1.default.find({
                category: category._id,
            });
            return {
                category: category.name,
                items: items.map((item) => ({
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    image: item.image,
                    showInMenu: item.showInMenu,
                })),
            };
        }));
        return res.status(200).json({
            restaurant: {
                name: resEmail.restrauntName,
                photoURL: resEmail.photoURL,
                itemImageEnabled: resEmail.itemImageEnabled,
            },
            menu
        });
    }
    catch (error) {
        console.error("Error fetching menu:", error);
        return res.status(500).json({ error: "Failed to fetch menu" });
    }
};
exports.getMenu = getMenu;
//# sourceMappingURL=menu.controller.js.map