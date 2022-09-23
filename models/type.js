import mongoose, { Schema, ObjectId } from "mongoose";
const TypesSchema = new Schema(
  {
    color: {
      type: String,
      require: true,
    },
    size: {
      type: String,
    },
    quantity: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Type", TypesSchema);
