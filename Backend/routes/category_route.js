import express from "express";
const router = express.Router();
import {
  addCategory,
  getCategory,
  deleteOne,
  updateCategory,
} from "../controllers/category_controller.js";

router.get("/category", getCategory);
router.post("/uploadcategory", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteOne);

export default router;
