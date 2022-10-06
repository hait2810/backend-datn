import express from 'express'
import { addNewOrder, editOrder, listOrder, removeOrder } from '../controllers/orders'

const router = express.Router()

router.post("/orders", addNewOrder)
router.put("/orders/:id", editOrder)
router.get("/orders",listOrder)
router.delete("/orders/:id", removeOrder)
export default router