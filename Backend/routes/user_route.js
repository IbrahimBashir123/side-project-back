import express from "express";
const router = express.Router();
import { signup, login, getuser , get, deleteOne, put} from "../controllers/user_controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/getuser", getuser);
router.get("/get", get);
router.delete("/deletebyid", deleteOne);
router.put("/editbyid", put);





export default router;
