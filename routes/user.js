import express from "express";

import {
  listUser,
  readUser,
  signin,
  signup,
  updateUsers,
  verifyEmail,
  forgetPassword
} from "../controllers/user";
const router = express.Router();
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

router.post("/users", listUser);
router.put("/user/:id", requireSignin, isAuth, isAdmin, updateUsers);
router.get("/user/:id", readUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify/:id", verifyEmail);
router.post("/forget-password", forgetPassword);

export default router;
