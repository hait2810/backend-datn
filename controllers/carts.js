import Carts from "../models/carts";
import User from "../models/user";

export const addCart = async (req,res) => {
          try {
            const carts = await Carts(req.body).save()
            res.json(carts)
          } catch (error) {
            res.status(400).json(error)
          }
}
export const getCart = async (req,res) => {
        try {
            const cart = await Carts.findOne({userID: req.params.id}).exec()
            res.json(cart)
        } catch (error) {
            res.status(400).json(error)
        }
}
export const updateCart = async (req,res) => {
  try {
    const cart = await Carts.findByIdAndUpdate({userID: req.params.id}, req.body, {
        returnDocument: "after"
    }).exec()
    res.json(cart)
  } catch (error) {
      res.status(400).json(error)
  }
}