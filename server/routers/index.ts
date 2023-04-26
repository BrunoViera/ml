import express from "express";
import item from "./item";

const router = express.Router();

router.use(item);

export default router;
