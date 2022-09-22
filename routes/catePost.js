import express from "express";
import {
  createCate,
  listCate,
  readCate,
  removeCate,
  updateCate,
} from "../controllers/catePost";

const router = express.Router();

router.post("/catepost", createCate);
router.get("/catepost", listCate);
router.get("/catepost/:id", readCate);
router.delete("/catepost/:id", removeCate);
router.put("/catepost/:id", updateCate);

export default router;
