"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("./menu.controller");
const menuRouter = (0, express_1.Router)();
menuRouter.get("/", menu_controller_1.getMenu);
exports.default = menuRouter;
//# sourceMappingURL=menu.route.js.map