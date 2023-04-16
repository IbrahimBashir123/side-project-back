import express from "express";
const router = express.Router();
import {
  addProduct,
  getProduct,
  deleteOne,
  updateProduct,
} from "../controllers/product_controller.js";

router.get("/product", getProduct);
router.post("/uploadproduct", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteOne);

export default router;

// router.post("/",  image.uploadImage, controller.post);
