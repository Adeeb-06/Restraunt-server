"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const firebase_admin_1 = __importDefault(require("../config/firebase-admin"));
const verifyAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "Unauthorized — no token provided" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = await firebase_admin_1.default.auth().verifyIdToken(token);
        req.userEmail = decoded.email;
        req.firebaseUid = decoded.uid;
        req.userId = decoded.uid;
        next();
    }
    catch (err) {
        console.error("verifyAuth Error:", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.verifyAuth = verifyAuth;
//# sourceMappingURL=auth.js.map