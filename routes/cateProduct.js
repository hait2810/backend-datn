import express from "express";
import {
  createCate,
  listCate,
  readCate,
  removeCate,
  updateCate,
} from "../controllers/cateProduct";
const router = express.Router();

router.post("/cateproduct", createCate);
router.get("/cateproduct", listCate);
router.get("/cateproduct/:id", readCate);
router.delete("/cateproduct/:id", removeCate);
router.put("/cateproduct/:id", updateCate);

export default router;
