import { Router } from "express";
import { getMenu } from "./menu.controller";

const menuRouter = Router();

menuRouter.get("/", getMenu);

export default menuRouter;