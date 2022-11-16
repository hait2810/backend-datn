import express from "express";
import {
  createContact,
  listContact,
  readContact,
  removeContact,
  updateContact,
} from "../controllers/contact";

const router = express.Router();

router.post("/contact", createContact);
router.put("/contact/:id", updateContact);
router.get("/contacts", listContact);
router.get("/contact/:id", readContact);
router.delete("/contact/:id", removeContact);

export default router;
