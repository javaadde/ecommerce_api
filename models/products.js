import mongoose from "mongoose";

const proSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    category_id: String,
    discription:String,
    url: String,
    public_id:String,
  },
  { timestamps: true }
);

export const products = mongoose.model("products", proSchema);
