import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    _id: String,
    discription: String,
  },
  { timestamps: true }
);

export const category = mongoose.model("categories", categorySchema);
