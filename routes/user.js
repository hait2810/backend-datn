import express from "express";

import {
  listUser,
  readUser,
  signin,
  signup,
  updateUsers,
  verifyEmail,
} from "../controllers/user";
const router = express.Router();

router.post("/users", listUser);
router.put("/user/:id", updateUsers);
router.get("/user/:id", readUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify/:id", verifyEmail);

export default router;
