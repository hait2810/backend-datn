import Product from "../models/product";

export const createProduct = async (req, res) => {
  try {
    const products = await new Product(req.body).save();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được bài viết",
    });
  }
};

export const listProduct = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const count = await Product.find({}).count();
    const skip = body.limit * (body.page - 1);
    const products = await Product.find({}).skip(1).limit(2);
    res.json({ products, count });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Không hiển thị bài viết",
    });
  }
};

export const readProduct = async (req, res) => {
  try {
    const Products = await Product.findOne({ _id: req.params.id }).exec();
    res.json(Products);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị bài viết",
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const Products = await Product.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(Products);
  } catch (error) {
    res.status(400).json({
      message: "Không xoá được",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const Products = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(Products);
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};
