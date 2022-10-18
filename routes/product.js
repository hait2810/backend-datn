import express from "express";
import {
  createProduct,
  listProduct,
  readProduct,
  removeProduct,
  updateProduct,
  updateQuantityProduct,
  updateType,
} from "../controllers/product";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = express.Router();

router.post("/product", requireSignin, isAuth, isAdmin, createProduct);
router.post("/products", listProduct);
router.get("/product/:id", readProduct);
router.delete("/product/:id", requireSignin, isAuth, isAdmin, removeProduct);
router.put("/product/:id", requireSignin, isAuth, isAdmin, updateProduct);
router.put(
  "/updatequantity/",
  requireSignin,
  isAuth,
  isAdmin,
  updateQuantityProduct
);
router.put("/updatetype/:idt/:idp", updateType);
export default router;
