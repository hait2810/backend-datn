import express from "express";
import {
  createProduct,
  listProduct,
  readProduct,
  removeProduct,
  updateProduct,
} from "../controllers/product";

const router = express.Router();

router.post("/product", createProduct);
router.get("/product", listProduct);
router.get("/product/:id", readProduct);
router.delete("/product/:id", removeProduct);
router.put("/product/:id", updateProduct);

export default router;
