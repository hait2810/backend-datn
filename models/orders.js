import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    product: {
      type: [],
      require: true,
    },
    infomation: {
      type: {},
      require: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    totalprice: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", ordersSchema);
