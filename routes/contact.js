import express from "express";
import { createContact } from "../controllers/contact";

const router = express.Router();

router.post("/contact", createContact);
router.put("/contact/:id", (req, res) => {});
router.get("/contacts", (req, res) => {});
router.get("/contact/:id", (req, res) => {});
router.delete("/contact/:id", (req, res) => {});

export default router;
