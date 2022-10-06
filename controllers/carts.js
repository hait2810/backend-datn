import Cart from '../models/carts'


export const addNewOrder = async (req,res) => {
        try {
            const cart = await Cart(req.body).save();
            res.json(cart)
        } catch (error) {
            res.status(400).json({message: error})
        }
}