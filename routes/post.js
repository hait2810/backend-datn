import express from "express";
import {
  createPosts,
  listPosts,
  readPosts,
  removePosts,
  updatePosts,
} from "../controllers/post";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = express.Router();

router.post("/post", requireSignin, isAuth, isAdmin, createPosts);
router.post("/posts", listPosts);
router.get("/post/:id", readPosts);
router.delete("/post/:id", requireSignin, isAuth, isAdmin, removePosts);
router.put("/post/:id", requireSignin, isAuth, isAdmin, updatePosts);

export default router;
