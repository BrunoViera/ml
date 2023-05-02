import express from "express";
import category from "./category";
import item from "./item";

const router = express.Router();

router.use(item);
router.use(category);

export default router;
