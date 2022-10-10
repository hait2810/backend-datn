import express from "express";
import { listUser, signin, signup, updateUsers } from "../controllers/user";
const router = express.Router();

router.post("/users", listUser);
router.put("/user/:id", updateUsers);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
