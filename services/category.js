import { isNullOrUndefined } from "mongoose/lib/utils.js";
import { category } from "../models/category.js";
import mongoose from "mongoose";

export async function insertOneCategoy(name, discription, url) {
  try {
    const isNameValid = (await category.findOne({ name: name })) || null

    if (isNameValid === null) {
      console.log(isNameValid);
      
      await category.insertOne({
        name: name,
        discription: discription,
        url: url,
      });
      return "created a category";
    }
    else{
      return "this name is all ready in there"
    }

  } catch (err) {
    if (err.code === 11000) {
      return "the category id allready exists";
    }
  }
}

export async function deleteOneCategory(category_id) {
  const updt = await category.deleteOne({
    _id: new mongoose.Types.ObjectId(category_id),
  });
  return updt;
}

export async function findCategory() {
  const data = await category.find();
  return data;
}

export async function findOneCategory(id) {
  console.log("iddd", id);

  const data = await category.findById(id);

  console.log(data);

  return data;
}
