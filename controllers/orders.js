import { clearCart, findOneCart } from "../services/cart.js";
import { findManyOrdersOfAnUser, storeUserData } from "../services/order.js";

export async function PlacingAnOrder(req, res) {
  try {
    if (req.session.data.role === "admin") {
      return res.json({
        message: "you are admin you cant order anything",
      });
    }

    const subtotal = req.body.total;
    const address = req.body.address;
    const user_id = req.session.data.username;

    // finding the user's cart taking the subtotal and items
    const cartData = await findOneCart(user_id);

    if (cartData.items.length === 0) {
      return res.json({
        message: "your cart is empty",
      });
    }

    // storing order data
    const inserted = await storeUserData(subtotal, user_id, cartData, address);
    console.log("inserted", inserted);

    // clearing the cart of the user
    const cleared = await clearCart(user_id);
    console.log("cleared", cleared);

    res.json({
      message: "order placed sucessfully",
    });
  } catch (err) {
    console.error(err);
  }
}

export async function GetUserOrders(req, res) {
  try {
    const user_id = req.session.data.username;
    const data = await findManyOrdersOfAnUser(user_id);

    res.json(data);
  } catch (error) {}
}
