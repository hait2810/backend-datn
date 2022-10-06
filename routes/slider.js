import express from "express";
import {
  createSliders,
  listSliders,
  readSliders,
  removeSliders,
  updateSliders,
} from "../controllers/slider";

const router = express.Router();

router.post("/slider", createSliders);
router.post("/sliders", listSliders);
router.get("/slider/:id", readSliders);
router.delete("/slider/:id", removeSliders);
router.put("/slider/:id", updateSliders);

export default router;
