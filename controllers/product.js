import { ObjectId } from "mongoose";
import Product from "../models/product";
import Order from "../models/orders";

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

export const thongKeByDate = async (req, res) => {
  try {
    const soldByDate = await Order.aggregate([
      {
        $addFields: {
          day: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },

          // month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          // year: { $dateToString: { format: "%Y", date: "$createdAt" } },
        },
      },
      {
        $match: {
          day: req.body.day,
        },
      },
    ]);
    const thongKe = await Product.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.body.gt),
            $lte: new Date(req.body.lt),
          },
        },
      },
      {
        $addFields: {
          quantity: {
            $sum: "$type.quantity",
          },
        },
      },
      {
        $addFields: {
          soldInDay: soldByDate.length,
        },
      },
      {
        $addFields: {
          total_import_price: { $multiply: ["$listed_price", "$quantity"] },
          total_export_price: { $multiply: ["$price", "$soldInDay"] },
        },
      },
    ]);
    const total = {
      quantity: 0,
      total_import_price: 0,
      total_export_price: 0,
      turnover: 0,
      sold: 0,
    };
    thongKe.forEach((product) => {
      total.quantity += +product.quantity;
      total.total_import_price += +product.total_import_price;
      total.total_export_price += +product.total_export_price;
      total.sold += Number(product.sold || 0);
      total.turnover = total.total_import_price - total.total_export_price;
    });
    res.json({
      ...total,
      soldInDay: soldByDate.length,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Khong tinh duoc",
    });
  }
};
export const thongKeByMonth = async (req, res) => {
  try {
    const soldByDate = await Order.aggregate([
      {
        $addFields: {
          day: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" },
          },

          // month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          // year: { $dateToString: { format: "%Y", date: "$createdAt" } },
        },
      },
      {
        $match: {
          day: req.body.day,
        },
      },
    ]);
    const thongKe = await Product.aggregate([
      {
        $addFields: {
          day: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" },
          },
        },
      },
      {
        $match: {
          day: req.body.day,
        },
      },
      {
        $addFields: {
          quantity: {
            $sum: "$type.quantity",
          },
        },
      },
      {
        $addFields: {
          soldInDay: soldByDate.length,
        },
      },
      {
        $addFields: {
          total_import_price: { $multiply: ["$listed_price", "$quantity"] },
          total_export_price: { $multiply: ["$price", "$soldInDay"] },
        },
      },
    ]);
    const total = {
      quantity: 0,
      total_import_price: 0,
      total_export_price: 0,
      turnover: 0,
    };
    thongKe.forEach((product) => {
      total.quantity += +product.quantity;
      total.total_import_price += +product.total_import_price;
      total.total_export_price += +product.total_export_price;
      total.turnover = total.total_import_price - total.total_export_price;
    });
    res.json({
      ...total,
      soldInDay: soldByDate.length,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Khong tinh duoc",
    });
  }
};
export const thongKeByYear = async (req, res) => {
  try {
    // const soldByDate = await Order.aggregate([
    //   {
    //     $addFields: {
    //       year: {
    //         $dateToString: { format: "%Y", date: "$createdAt" },
    //       },

    //       // month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
    //       // year: { $dateToString: { format: "%Y", date: "$createdAt" } },
    //     },
    //   },
    //   {
    //     $match: {
    //       year: req.body.year,
    //     },
    //   },
    // ]);
    // const thongKe = await Product.aggregate([
    //   {
    //     $match: {
    //       createdAt: {
    //         $gt: req.body.start_year,
    //         $lt: req.body.end_year,
    //       },
    //     },
    //   },

    //   {
    //     $addFields: {
    //       quantity: {
    //         $sum: "$type.quantity",
    //       },
    //     },
    //   },
    //   {
    //     $addFields: {
    //       soldInDay: soldByDate.length,
    //     },
    //   },
    //   {
    //     $addFields: {
    //       total_import_price: { $multiply: ["$listed_price", "$quantity"] },
    //       total_export_price: { $multiply: ["$price", "$soldInDay"] },
    //     },
    //   },
    // ]);
    // const total = {
    //   quantity: 0,
    //   total_import_price: 0,
    //   total_export_price: 0,
    //   turnover: 0,
    // };
    // thongKe.forEach((product) => {
    //   total.quantity += +product.quantity;
    //   total.total_import_price += +product.total_import_price;
    //   total.total_export_price += +product.total_export_price;
    //   total.turnover = total.total_import_price - total.total_export_price;
    // });

    const thongKe = await Product.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.body.gt),
            $lte: new Date(req.body.lt),
          },
        },
      },

      // {
      //   $addFields: {
      //     quantity: {
      //       $sum: "$type.quantity",
      //     },
      //   },
      // },
      // {
      //   $addFields: {
      //     soldInDay: soldByDate.length,
      //   },
      // },
      // {
      //   $addFields: {
      //     total_import_price: { $multiply: ["$listed_price", "$quantity"] },
      //     total_export_price: { $multiply: ["$price", "$soldInDay"] },
      //   },
      // },
    ]);
    res.json(thongKe);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Khong tinh duoc",
    });
  }
};
export const thongke = async (req, res) => {
  try {
    const body = req.body;
    const count = await Product.find({}).count();
    const skip = body.limit * (body.page - 1);
    const all = await Product.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.body.gt),
            $lte: new Date(req.body.lt),
          },
        },
      },
      {
        $addFields: {
          quantity: {
            $sum: "$type.quantity",
          },
        },
      },
      {
        $addFields: {
          total_import_price: { $multiply: ["$listed_price", "$quantity"] },
          total_export_price: { $multiply: ["$price", "$sold"] },
          stock: { $subtract: ["$quantity", "$sold"] },
        },
      },
      {
        $addFields: {
          turnover: {
            $subtract: ["$total_export_price", "$total_import_price"],
          },
        },
      },
    ]);

    const thongkeorder = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.body.gt),
            $lte: new Date(req.body.lt),
          },
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product._id",
          sold: { $sum: "$product.quantity" },
          tiendaban: { $sum: "$productmonney" },
        },
      },
      {
        $addFields: {
          total_export_price: { $multiply: ["$sold", "$tiendaban"] },
        },
      },
      { $sort: { sold: -1 } },
    ]);
    // .skip(skip)
    // .limit(body.limit);

    const total = {
      quantity: 0,
      sold: 0,
      total_import_price: 0,
      total_export_price: 0,
    };
    for (let i = 0; i < thongkeorder.length; i++) {
      const product = await Product.findOne({
        _id: thongkeorder[i]._id,
      });
      thongkeorder[i].product = product;
    }
    thongkeorder.forEach(async (order) => {
      total.total_export_price += +order.total_export_price;
      total.sold += +order.sold;
    });
    all.forEach((product) => {
      total.quantity += +product.quantity;
      total.total_import_price += +product.total_import_price;
    });
    total.doanhthu = total.total_export_price - total.total_import_price;
    const list = thongkeorder.slice(0, 5);
    res.json({ list, total });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị sản phẩm",
    });
  }
};
export const thongke_tong = async (req, res) => {
  const all = await Product.aggregate([
    {
      $addFields: {
        quantity: {
          $sum: "$type.quantity",
        },
      },
    },
    {
      $addFields: {
        total_import_price: { $multiply: ["$listed_price", "$quantity"] },
        total_export_price: { $multiply: ["$price", "$sold"] },
        stock: { $subtract: ["$quantity", "$sold"] },
      },
    },
    {
      $addFields: {
        turnover: {
          $subtract: ["$total_export_price", "$total_import_price"],
        },
      },
    },
    { $sort: { sold: -1 } },
  ]);
  const total = {
    quantity: 0,
    sold: 0,
    total_import_price: 0,
    total_export_price: 0,
  };
  all.forEach((product) => {
    total.quantity += +product.quantity;
    total.sold += Number(product.sold || 0);
    total.total_import_price += +product.total_import_price;
    total.total_export_price += +product.total_export_price;
  });
  total.doanhthu = total.total_export_price - total.total_import_price;
  res.json(total);
};

export const search = async (req, res) => {
  try {
    const conditions = { name: { $regex: req.query.name, $options: "i" } };
    console.log(conditions);
    const products = await Product.find(conditions);
    res.json(products);
  } catch (error) {
    res.status(400).json({
      error: "Không timf được sản phẩm",
    });
  }
};

export const filter_product = async (req, res) => {
  try {
    const count = await Product.find({}).count();
    const products = await Product.find({
      name: {
        $regex: req.body.name,
        $options: "i",
      },
      price: {
        $gt: req.body.prices.gt,
        $lt: req.body.prices.lt,
      },
    });
    res.json({ products, count });
  } catch (error) {
    res.status(400).json({
      error: "Không timf được sản phẩm",
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

    const product = await Product.findById(_id).exec();

    const newType = product.type.map((type) => {
      if (type.color === color && type.size === size) {
        if (quantity > type.quantity) {
          throw {
            code: 503,
            message:
              "Sản phẩm " +
              product.name +
              ", size: " +
              size +
              ", màu: " +
              color +
              " chỉ còn " +
              type.quantity +
              " sản phẩm.",
            color,
          };
        }
        return {
          ...type,
          quantity: type.quantity - quantity,
        };
      }
      return type;
    });
    product.sold += quantity;
    product.type = newType;
    const resp = await Product.findByIdAndUpdate(_id, product, {
      returnDocument: "after",
    }).exec();

    res.json(resp);
  } catch (error) {
    res.json(error);
  }
};

export const updateType = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.idp }).exec();
    const newType = product.type.map((item) => {
      if (JSON.stringify(item._id) === JSON.stringify(req.params.idt)) {
        if (req.body.quantity <= 0) {
          throw "Quantity lớn hơn 0";
        }
        return {
          ...item,
          color: req.body.color,
          size: req.body.size,
          quantity: req.body.quantity,
        };
      }
      return item;
    });
    product.type = newType;
    const update = await Product.findByIdAndUpdate(
      { _id: req.params.idp },
      product,
      {
        returnDocument: "after",
      }
    ).exec();
    res.json(update);
  } catch (error) {
    res.json(error);
  }
};

export const countNumberProduct = async (req, res) => {
  try {
    const { _id, color, size, quantity } = req.body;

    const product = await Product.findById(_id).exec();

    const newType = product.type.map((type) => {
      if (type.color === color && type.size === size) {
        if (quantity > type.quantity) {
          throw {
            code: 503,
            message:
              "Sản phẩm " +
              product.name +
              ", size: " +
              size +
              ", màu: " +
              color +
              " chỉ còn " +
              type.quantity +
              " sản phẩm.",
            color,
          };
        }
      }
      return type;
    });
    res.json({
      code: 200,
      message: "Success",
    });
  } catch (error) {
    res.json(error);
  }
};
