import express from "express";
import {
  createTypes,
  listTypes,
  readTypes,
  removeTypes,
  updateTypes,
} from "../controllers/type";
const router = express.Router();

// router.post("/type", createTypes);
router.get("/type", listTypes);
router.get("/type/:id", readTypes);
router.delete("/type/:id", removeTypes);
router.put("/type/:id", updateTypes);

export default router;
