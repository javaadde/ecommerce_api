import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  _id:String,
  items: Array,
  subtotal: { type: Number, default: 0 },
});

export const cart = mongoose.model("cart", cartSchema);
