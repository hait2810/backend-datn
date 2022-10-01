import express from "express";
import {
  createSize,
  listSize,
  readSize,
  removeSize,
  updateSize,
} from "../controllers/size";

const router = express.Router();

router.post("/size", createSize);
router.get("/size", listSize);
router.get("/size/:id", readSize);
router.delete("/size/:id", removeSize);
router.put("/size/:id", updateSize);

export default router;
