import Product from "../models/product";

export const createProduct = async (req, res) => {
  try {
    const products = await new Product(req.body).save();
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được sản phẩm",
    });
  }
};

export const listProduct = async (req, res) => {
  try {
    const body = req.body;
    const count = await Product.find({}).count();
    const skip = body.limit * (body.page - 1);
    const products = await Product.find({})
      .skip(skip)
      .limit(body.limit)
      .populate("categoryId");
    res.json({ products, count });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
    });
  }
};

export const readProduct = async (req, res) => {
  try {
    const Products = await Product.findOne({ _id: req.params.id }).exec();
    res.json(Products);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
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

export const updateQuantityProduct = async (req, res) => {
  try {
    const { _id, color, size, quantity } = req.body;

    const product = await Product.findById({
      _id,
      type: { $elemMatch: { color: color, size: size } },
    }).exec();
    
    console.log('old product', product);
    const newType = product.type.map((type) => {
      if (type.color === color && type.size === size) {
        if (quantity > type.quantity) {
          throw 'Error quantity'
        }
        return {
          ...type,
          quantity: type.quantity - quantity,
        };
      }
      return type;
    });
    product.type = newType;
    const resp = await Product.findByIdAndUpdate(_id, product).exec();
    console.log('new product', resp)
    res.json(resp);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
