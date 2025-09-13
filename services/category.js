import { category } from "../models/category.js";

export async function insertOneCategoy(name, discription) {
  try {
    await category.insertOne({ _id: name, discription: discription });
    return "created a category";
  } catch (err) {
    if (err.code === 11000) {
      return "the category id allready exists";
    }
  }
}

export async function deleteOneCategory(category_id) {
  const updt = await category.deleteOne({ _id: category_id });
  return updt;
}

export async function findCategory() {
  const data = await category.find();
  return data;
}
