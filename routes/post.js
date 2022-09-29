import express from "express";
import {
  createPosts,
  listPosts,
  readPosts,
  removePosts,
  updatePosts,
} from "../controllers/post";
const router = express.Router();

router.post("/post", createPosts);
router.get("/post", listPosts);
router.get("/post/:id", readPosts);
router.delete("/post/:id", removePosts);
router.put("/post/:id", updatePosts);

export default router;
