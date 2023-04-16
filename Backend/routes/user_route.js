import express from "express";
const router = express.Router();
import { signup, login, getuser , get, deleteOne, put} from "../controllers/user_controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/getuser", getuser);
router.get("/:id", get);
router.put("/:id", put);
router.delete("/:id", deleteOne);


// router.get('/', getAll);
// router.get('/:id', get);
// router.post('/', post);
// router.put('/:id', put);
// router.delete('/:id', deleteOne);



export default router;
