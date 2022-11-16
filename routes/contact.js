import express from "express";

const router = express.Router();

router.post("/contact", (req, res) => {});
router.put("/contact/:id", (req, res) => {});
router.get("/contacts", (req, res) => {});
router.get("/contact/:id", (req, res) => {});
router.delete("/contact/:id", (req, res) => {});

export default router;
