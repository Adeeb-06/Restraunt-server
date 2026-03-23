"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("./item.controller");
const auth_1 = require("../../middlewares/auth");
const isOwner_1 = require("../../middlewares/isOwner");
const itemRouter = (0, express_1.Router)();
itemRouter.get("/", auth_1.verifyAuth, item_controller_1.getAllItems);
itemRouter.get("/:id", item_controller_1.getItemById);
itemRouter.post("/create", auth_1.verifyAuth, isOwner_1.isOwner, item_controller_1.createItem);
itemRouter.put("/:id", auth_1.verifyAuth, isOwner_1.isOwner, item_controller_1.updateItem);
itemRouter.delete("/:id", auth_1.verifyAuth, isOwner_1.isOwner, item_controller_1.deleteItem);
exports.default = itemRouter;
//# sourceMappingURL=item.route.js.map