"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = void 0;
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const isOwner = async (req, res, next) => {
    try {
        const user = await user_model_1.default.findOne({ email: req.userEmail });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (user.role !== "owner") {
            res.status(403).json({ message: "Unauthorized - Requires Owner role" });
            return;
        }
        next();
    }
    catch (error) {
        console.error("isOwner error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.isOwner = isOwner;
//# sourceMappingURL=isOwner.js.map