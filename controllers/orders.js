import Order from "../models/orders";

export const addNewOrder = async (req, res) => {
  try {
    const cart = await Order(req.body).save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const editOrder = async (req, res) => {
  try {
    const cart = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" }
    ).exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const readCart = async (req, res) => {
  try {
    const cart = await Order.findById({ _id: req.params.id }).exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const listOrder = async (req, res) => {
  try {
    const cart = await Order.find()
      .sort({
        createdAt: "desc",
      })
      .exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const removeOrder = async (req, res) => {
  try {
    const cart = await Order.findByIdAndRemove({ _id: req.params.id }).exec();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
