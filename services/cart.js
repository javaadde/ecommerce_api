import { cart } from "../models/cart.js";
import { products } from "../models/products.js";


export async function createCart(user_id){
    try {
       await cart.insertOne(
            {
              _id:user_id,
            }
        )   
        
    } catch (error) {
        console.log(error);
    }
}


export async function findOneCart(user_id) {
   const cartData = await cart.findOne({_id:user_id});
   return cartData
} 


export async function addItemToCart(user_id,product_id) {

    try {
    const proDetails = await products.findOne({_id:product_id})

    const updated = await cart.updateOne({_id:user_id} , {$addToSet:{items:{
        product_id:proDetails._id,
        name:proDetails.name,
        price:proDetails.price,
        quantity:1,
        url:proDetails.url,
    }}}) 
   

    if(updated.modifiedCount > 0){
        return 'item added to cart'
    }
    else if( updated.modifiedCount === 0){
        return 'item is allready in the cart'
    }
    else{
        return 'error occured from adding the item'
    }
        
    } catch (error) {
      console.log(error);
    }

    
}


export async function increaseQuantityOfItem(user_id,product_id) {

        const updated = await cart.updateOne(
            {_id:user_id, "items.product_id":product_id},
            {$inc:{"items.$.quantity":1}}
         )

         if (updated.modifiedCount === 1) {
            return 'incresed'
         }
         else{
            return 'error occured during the icresing'
         }   
}

export async function decreaseQuantityOfItem(user_id,product_id) {

         const updated = await cart.updateOne(
            {_id:user_id, "items.product_id":product_id},
            {$inc:{"items.$.quantity":-1}}
         )

         if (updated.modifiedCount === 1) {
           
             return 'decresed'
         }
         else{
             
             return 'error occured during the decreasing'
         }
}

export async function clearCart(user_id) {
    const updated = await cart.updateOne({_id:user_id}, {$unset:{items:[]}});
    return updated
}