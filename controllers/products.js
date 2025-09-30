import { findAllProducts, findCategoryProducts, searchWithQuery } from "../services/products.js";

export async function productsHome(req, res) {
  try {
    const allproducts = await findAllProducts();
    res.json(allproducts);
  } catch (error) {
    console.log(error);
  }
}

export async function productByCategory(req, res) {
  try {
    const category = req.params.category;
    const categoryProducts = await findCategoryProducts(category);
    res.json(categoryProducts);
  } catch (error) {
    console.log(error);
  }
}

export async function searchProducts(req,res) {
  try {
    
    const searchQuery = req.query.name;

    const data = await searchWithQuery(searchQuery);

    res.json(data)

  } catch (error) {
    console.log(error);
    
  }
}