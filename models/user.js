import mongoose from "mongoose";
import { createHmac } from "crypto";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    img: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate(password) {
    try {
      return this.password == this.encrytPassword(password);
    } catch (error) {
      console.log(error);
    }
  },
  encrytPassword(password) {
    if (!password) return;
    try {
      return createHmac("sha256", "123456").update(password).digest("hex");
    } catch (error) {
      console.log(error);
    }
  },
};
userSchema.pre("save", function (next) {
  try {
    this.password = this.encrytPassword(this.password);
    next();
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model("User", userSchema);
