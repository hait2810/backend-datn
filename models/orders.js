import mongoose,  {ObjectId} from "mongoose";

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
    userID: {
      type: ObjectId,
      ref: "User"
    },
    fee: {
      type: Number,
      require: true
    },
    weight: {
      type: Number,
      require: true
    },
    length: {
      type: Number,
      require: true
    },
    width: {
      type: Number,
      require: true
    },
    height: {
      type: Number,
      require: true
    },
    productmonney: {
      type: Number,
      require: true
    },
    order_code: {
      type: String
    },
    totalprice: {
      type: Number,
      require: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Order", ordersSchema);
