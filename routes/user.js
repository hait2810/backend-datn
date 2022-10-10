import express from "express";
import { listUser, signin, signup } from "../controllers/user";
const router = express.Router();

router.post("/users", listUser);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
