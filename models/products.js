import mongoose from "mongoose";

const proSchema = mongoose.Schema(
  {
    _id: String,
    name: String,
    price: Number,
    category_id: String,
    url: String,
  },
  { timestamps: true }
);

export const products = mongoose.model("products", proSchema);
