// services

import { addItemToCart, decreaseQuantityOfItem, increaseQuantityOfItem } from "../services/cart.js";


export async function cartHome(req,res) {
     
    res.json({
        message:'this is your cart'
    })
}

export async function AddtoCart(req,res) {

    const user_id = req.session.data.username;
       const product_id = req.params.pro_id;
       
       const mess = await addItemToCart(user_id,product_id);
    
       res.json({
         message:mess,
       })
    
}


export async function operationOnItems(req,res) {

     const user_id = req.session.data.username;
     const product_id = req.body.id
     const operation = req.params.operation
     console.log(operation,product_id);

     

     try{

        if(operation === 'increase'){

            const mess = await increaseQuantityOfItem(user_id,product_id)
            res.json({
                message:mess,
            })

        }
     else if(operation === 'decrease'){
        
          const mess = await decreaseQuantityOfItem(user_id,product_id)
          res.json({
            message:mess,
          })
     }
     else{
       
         res.json({
            message:'error occured during the updation',
         })
     }

    }

    catch(err){
        console.error(err);
    }
}