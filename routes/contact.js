import express from "express";
import { createContact, updateContact } from "../controllers/contact";

const router = express.Router();

router.post("/contact", createContact);
router.put("/contact/:id", updateContact);
router.get("/contacts", (req, res) => {});
router.get("/contact/:id", (req, res) => {});
router.delete("/contact/:id", (req, res) => {});

export default router;
