import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import { connectToDatabase } from "./config/mongodb";
import userRouter from "./modules/user/user.route";
import categoryRouter from "./modules/category/category.route";
import itemRouter from "./modules/items/item.route";
import menuRouter from "./modules/menu/menu.route";

// Connect to MongoDB
connectToDatabase();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.3:3000",
      process.env.CLIENT_URL || "",
      process.env.FRONTEND_URL || "",
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ message: "🍽️ Restaurant Server is running!" });
});

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/items", itemRouter);
app.use("/api/menu", menuRouter);

// ─── Start ────────────────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

export default app;
