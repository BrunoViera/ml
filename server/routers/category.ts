import express from "express";
import controller from "../controllers/api/category.controller";

const router = express.Router();

router.route("/api/category/:categoryId").get(controller.getCategory);

export default router;
