import express from 'express'
import { addNewOrder, editOrder, listOrder } from '../controllers/orders'

const router = express.Router()

router.post("/orders", addNewOrder)
router.put("/orders/:id", editOrder)
router.get("/orders",listOrder)
export default router