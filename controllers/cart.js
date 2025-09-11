// services

import { addItemToCart, decreaseQuantityOfItem, findOneCart, increaseQuantityOfItem } from "../services/cart.js";


export async function cartHome(req,res) {

    try{
        
        const user_id = req.session.data.username
        console.log(user_id);
        
        const data = await findOneCart(user_id)
         
        res.json(data)

    }
    catch(err){
        res.json({
            message:'please signin first'
        })
    }

}

export async function AddtoCart(req,res) {

    try {
        
        const user_id = req.session.data.username;
           const product_id = req.params.pro_id;
           
           const mess = await addItemToCart(user_id,product_id);
        
           res.json({
             message:mess,
           })
        
    }
     catch (error) {
        res.json({
            message:'please signin first'
        })
    }

}


export async function operationOnItems(req,res) {


    
    try{
         
         
              const user_id = req.session.data.username;
              const product_id = req.body.id
              const operation = req.params.operation
              console.log(operation,product_id);
         
              

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
        res.json({
            message:'please signin first'
        })
        console.error(err);
    }
}