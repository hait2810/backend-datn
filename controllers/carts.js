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
            const user = await User.findOne({_id: req.params.id}).exec()
            const cart = await Carts.find({userID: user._id}).exec()
            res.json(cart)
        } catch (error) {
            res.status(400).json(error)
        }
}