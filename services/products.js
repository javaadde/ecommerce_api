import { products } from "../models/products.js";


export async function findAllProducts(){
  const allproducts = await products.find()
  return allproducts;
}


export async function findCategoryProducts(category) {
    const allproducts = await products.find({category:category});
    return allproducts
}


export async function addProduct(pro) {

    try{
        await products.insertOne(pro)
        return 'inserted successly'
    }
    catch(err){
        if (err.code === 11000) {
            return 'the product_id is allready exists'
        }
        console.log(err);
    }

}


export async function deleteProduct(id) {
    try{
       const dlt = await products.deleteOne({_id:id})
       if(dlt.deletedCount > 0){
           return 'deleted'
       }else{
           return 'please ensure the id is exists'
       }
    }
    catch(err){
        console.log(err);
        return 'cannot get deleted'
    }
}


export async function updateProduct(product) {
    const id = product._id;
    const pro = product
    delete pro._id;

    try{
    const updated = await products.updateOne({_id:id},{$set:
        pro
    });

     if(updated.modifiedCount > 0){
        return 'updated successfully'
     }
     else{
        return 'please check your updating with new data'
     }

    }
    catch(err){
        console.log(err);
    }
    
}