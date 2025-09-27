import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  name:String,
  user_id:String,
  items: Array,
  subtotal: { type: Number, default: 0 },
});

export const cart = mongoose.model("cart", cartSchema);
