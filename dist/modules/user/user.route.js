"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middlewares/auth");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", user_controller_1.registerUser);
userRouter.post("/upsert", user_controller_1.upsertUser);
userRouter.get("/:email/exists", user_controller_1.userExists);
userRouter.get("/", auth_1.verifyAuth, user_controller_1.getAllUsers);
userRouter.get("/:email", auth_1.verifyAuth, user_controller_1.getUserByEmail);
userRouter.patch("/:email/role", auth_1.verifyAuth, user_controller_1.updateUserRole);
userRouter.patch("/:email/settings", auth_1.verifyAuth, user_controller_1.updateUserSettings);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map