import express from 'express'
import { addNewOrder } from '../controllers/carts'

const router = express.Router()

router.post("/carts", addNewOrder)


export default router