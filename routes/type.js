import express from "express";
import {
  createTypes,
  listTypes,
  readTypes,
  removeTypes,
  updateTypes,
} from "../controllers/type";
const router = express.Router();

router.post("/types", createTypes);
router.get("/types", listTypes);
router.get("/types/:id", readTypes);
router.delete("/types/:id", removeTypes);
router.put("/types/:id", updateTypes);

export default router;
