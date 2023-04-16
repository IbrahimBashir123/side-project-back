import express from "express";
const router = express.Router();
import { addProduct, getProduct } from "../controllers/product_controller.js";

router.get("/product", getProduct);
router.post("/uploadproduct", addProduct);

export default router;
