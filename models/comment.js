import mongoose, { Schema, ObjectId } from "mongoose";
const commentSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    productId: {
      type: ObjectId,
      ref: "Product",
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: {
      _id: 1,
      fullname: 1,
    },
  });

  next();
});

commentSchema.virtual("user", {
  ref: "User",
  foreignField: "_id",
  localField: "userId",
  justOne: true,
});

export default mongoose.model("Comment", commentSchema);
