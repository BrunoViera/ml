import express from "express";
import controller from "../controllers/api/item.controller";

const router = express.Router();

router.route("/api/items").get(controller.getItems);
router.route("/api/items/:itemId").get(controller.getItem);

export default router;
