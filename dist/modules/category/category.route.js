"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const auth_1 = require("../../middlewares/auth");
const isOwner_1 = require("../../middlewares/isOwner");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/", auth_1.verifyAuth, category_controller_1.getAllCategories);
categoryRouter.get("/:id", category_controller_1.getCategoryById);
categoryRouter.post("/", auth_1.verifyAuth, isOwner_1.isOwner, category_controller_1.createCategory);
categoryRouter.put("/:id", auth_1.verifyAuth, isOwner_1.isOwner, category_controller_1.updateCategory);
categoryRouter.delete("/:id", auth_1.verifyAuth, isOwner_1.isOwner, category_controller_1.deleteCategory);
exports.default = categoryRouter;
//# sourceMappingURL=category.route.js.map