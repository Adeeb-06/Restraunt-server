"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const mongodb_1 = require("./config/mongodb");
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const category_route_1 = __importDefault(require("./modules/category/category.route"));
const item_route_1 = __importDefault(require("./modules/items/item.route"));
const menu_route_1 = __importDefault(require("./modules/menu/menu.route"));
(0, mongodb_1.connectToDatabase)();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://192.168.1.3:3000",
        process.env.CLIENT_URL || "",
        process.env.FRONTEND_URL || "",
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.get("/", (_req, res) => {
    res.json({ message: "🍽️ Restaurant Server is running!" });
});
app.use("/api/users", user_route_1.default);
app.use("/api/categories", category_route_1.default);
app.use("/api/items", item_route_1.default);
app.use("/api/menu", menu_route_1.default);
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map