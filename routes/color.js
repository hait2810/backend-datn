import express from "express";
import {
  createColor,
  listColor,
  readColor,
  removeColor,
  updateColor,
} from "../controllers/color";

const router = express.Router();

router.post("/color", createColor);
router.get("/color", listColor);
router.get("/color/:id", readColor);
router.delete("/color/:id", removeColor);
router.put("/color/:id", updateColor);

export default router;
