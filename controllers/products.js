import { findAllProducts,findCategoryProducts } from "../services/products.js";

export async function productsHome(req,res) {
    const allproducts = await findAllProducts();
    res.json(allproducts)
}


export async function productByCategory(req,res) {
    const category = req.params.category;
    const categoryProducts = await findCategoryProducts(category)
    res.json(categoryProducts)
}