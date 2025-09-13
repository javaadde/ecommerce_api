import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user_id: String,
    items: Array,
    total: Number,
    status: { type: String, default: "Placed" },
    date: { type: Date, default: Date.now },
    address: Object,
  },
  { timestamps: true }
);

export const orders = mongoose.model("orders", orderSchema);
