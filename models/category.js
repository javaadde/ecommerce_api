import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    _id:{type: mongoose.Schema.Types.ObjectId ,new:true, auto:true },
    name:String,
    discription: String,
    url:String,
  },
  { timestamps: true }
);

export const category = mongoose.model("categories", categorySchema);
