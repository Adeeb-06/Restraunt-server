"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    image: {
        type: String,
    },
    showInMenu: {
        type: Boolean,
        default: true
    },
    userEmail: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Item = mongoose_1.default.models.Item || mongoose_1.default.model("Item", itemSchema);
exports.default = Item;
//# sourceMappingURL=item.model.js.map