// services
import mongoose from "mongoose";

import {
  addItemToCart,
  decreaseQuantityOfItem,
  deleteProInCart,
  findOneCart,
  increaseQuantityOfItem,
  updateTotal,
} from "../services/cart.js";

export async function cartHome(req, res) {
  try {
    const user_id = req.session.data.username;
    console.log(user_id);

    const data = await findOneCart(user_id);

    res.json(data);
  } catch (err) {
    res.json({
      message: "please signin first",
    });
  }
}

export async function AddtoCart(req, res) {
  try {
    const user_id = req.session.data.username;
    const product_id = req.params.pro_id;

    const mess = await addItemToCart(user_id, product_id);
    await updateTotal(user_id);

    res.json({
      message: mess,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "surver error" });
  }
}

export async function operationOnItems(req, res) {
  const user_id = req.session.data.username;
  const product_id = req.query.id
  const operation = req.params.operation;

  try {
    console.log(operation, product_id);

    if (operation === "increase") {

      const user_cart = await findOneCart(user_id)
      const items = user_cart.items;
      console.log(items);
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let pro_id = item.product_id.toString();
        

         if( pro_id === product_id && item.quantity >= 5){
          return res.json({
            message:'you cant buy more than 5 items',
            problem:true,
          })
         }
      }

      const mess = await increaseQuantityOfItem(user_id, product_id);
      await updateTotal(user_id);
      res.json({
        message: mess,
      });
    } else if (operation === "decrease") {


      const user_cart = await findOneCart(user_id)
      const items = user_cart.items;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        let pro_id = item.product_id.toString();

         if(pro_id === product_id && item.quantity <= 1){
          return res.json({
            message:'you cant do that',
            problem:true,
          })
         }
      }


      const mess = await decreaseQuantityOfItem(user_id, product_id);
      await updateTotal(user_id);
      res.json({
        message: mess,
      });
    } else {
      res.json({
        message: "error occured during the updation",
      });
    }
  } catch (err) {
    res.json({
      message: "please signin first",
    });
    console.error(err);
  }
}


export async function deletCartItem(req, res) {
  try {
    const user_id = req.session.data.username;
    const product_id = req.params.id;

    console.log(user_id, product_id);

    const dlt = await deleteProInCart(user_id,product_id)
     
     if(dlt.modifiedCount > 0){
        res.json({
            message:'deleted the item'
        })
     }

  } catch (error) {
    console.log(error);
  }
}
