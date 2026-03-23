"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSettings = exports.updateUserRole = exports.getUserByEmail = exports.getAllUsers = exports.userExists = exports.upsertUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const registerUser = async (req, res) => {
    try {
        const { restrauntName, email, firebaseUid, photoURL } = req.body;
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const user = await user_model_1.default.create({
            restrauntName,
            email,
            firebaseUid: firebaseUid || "",
            photoURL: photoURL || "",
            role: "owner",
        });
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        console.error("registerUser error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ message });
    }
};
exports.registerUser = registerUser;
const upsertUser = async (req, res) => {
    try {
        const { restrauntName, email, firebaseUid, photoURL } = req.body;
        let user = await user_model_1.default.findOne({ email });
        if (!user) {
            user = await user_model_1.default.create({
                restrauntName: restrauntName || email.split("@")[0],
                email,
                firebaseUid: firebaseUid || "",
                photoURL: photoURL || "",
                role: "owner",
            });
        }
        else if (firebaseUid && !user.firebaseUid) {
            user.firebaseUid = firebaseUid;
            await user.save();
        }
        res.status(200).json({ message: "User upserted", user });
    }
    catch (error) {
        console.error("upsertUser error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ message });
    }
};
exports.upsertUser = upsertUser;
const userExists = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ exists: false });
            return;
        }
        res.status(200).json({ exists: true });
    }
    catch (error) {
        console.error("userExists error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.userExists = userExists;
const getAllUsers = async (_req, res) => {
    try {
        const users = await user_model_1.default.find().select("-__v");
        res.status(200).json(users);
    }
    catch (error) {
        console.error("getAllUsers error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getAllUsers = getAllUsers;
const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await user_model_1.default.findOne({ email }).select("-__v");
        if (!user) {
            res.status(404).json({ exists: false, message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("getUserByEmail error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getUserByEmail = getUserByEmail;
const updateUserRole = async (req, res) => {
    const { email } = req.params;
    const { role } = req.body;
    const validRoles = ["customer", "admin", "staff"];
    if (!validRoles.includes(role)) {
        res.status(400).json({ message: `Invalid role. Must be one of: ${validRoles.join(", ")}` });
        return;
    }
    try {
        const user = await user_model_1.default.findOneAndUpdate({ email }, { role }, { new: true }).select("-__v");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Role updated", user });
    }
    catch (error) {
        console.error("updateUserRole error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.updateUserRole = updateUserRole;
const updateUserSettings = async (req, res) => {
    const { email } = req.params;
    const { itemImageEnabled } = req.body;
    try {
        const user = await user_model_1.default.findOneAndUpdate({ email }, { $set: { itemImageEnabled } }, { new: true }).select("-__v");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Settings updated", user });
    }
    catch (error) {
        console.error("updateUserSettings error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.updateUserSettings = updateUserSettings;
//# sourceMappingURL=user.controller.js.map