import express from 'express'
import { addNewOrder, editOrder } from '../controllers/carts'

const router = express.Router()

router.post("/carts", addNewOrder)
router.put("/cart/:id", editOrder)

export default router