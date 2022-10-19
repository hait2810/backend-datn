import express from 'express'
import { addCart, getCart, updateCart } from '../controllers/carts'
const router = express.Router()
 
router.post("/carts", addCart)
router.get("/carts/:id", getCart)
router.put("/carts/:id", updateCart)
export default router