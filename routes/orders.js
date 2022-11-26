import express from 'express'
import { addNewOrder, editOrder, listOrder, readOrder, removeOrder, searchOrder } from '../controllers/orders'

const router = express.Router()

router.post("/orders", addNewOrder)
router.put("/orders/:id", editOrder)
router.get("/orders",listOrder)
router.get("/orders/:id", readOrder)
router.delete("/orders/:id", removeOrder)
router.post("/orderfind/", searchOrder)

export default router