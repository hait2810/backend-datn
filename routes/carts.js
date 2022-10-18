import express from 'express'
import { addCart, getCart } from '../controllers/carts'
const router = express.Router()
 
router.post("/carts", addCart)
router.get("/carts/:id", getCart)
export default router