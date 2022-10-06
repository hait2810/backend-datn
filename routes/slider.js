import express from "express";
import { createSliders } from "../controllers/slider";

const router = express.Router();

router.post("/slider", createSliders);

export default router;
