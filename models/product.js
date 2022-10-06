import mongoose, { Schema, ObjectId } from "mongoose";
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
    desc: {
      type: String,
      require: true,
    },
    type: {
      type: [{}],
    },
    subimg: {
      type: []
    },
    categoryId: {
      type: ObjectId,
      ref: "CategoryProduct",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Product", ProductSchema);
