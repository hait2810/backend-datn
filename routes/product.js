import express from "express";
import {
  createProduct,
  listProduct,
  readProduct,
  removeProduct,
  updateProduct,
  updateQuantityProduct,
} from "../controllers/product";

const router = express.Router();

router.post("/product", createProduct);
router.post("/products", listProduct);
router.get("/product/:id", readProduct);
router.delete("/product/:id", removeProduct);
router.put("/product/:id", updateProduct);
router.put("/updatequantity/", updateQuantityProduct);

export default router;
