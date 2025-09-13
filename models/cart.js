import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    _id: String,
    items: Array,
    subtotal: Number,
  },
  { timestamps: true }
);

export const cart = mongoose.model("cart", cartSchema);
