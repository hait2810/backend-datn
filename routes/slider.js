import express from "express";
import { createSliders, listSliders, readSliders } from "../controllers/slider";

const router = express.Router();

router.post("/slider", createSliders);
router.post("/sliders", listSliders);
router.get("/slider/:id", readSliders);

export default router;
