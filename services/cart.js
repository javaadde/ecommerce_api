import { cart } from "../models/cart.js";
import { products } from "../models/products.js";

export async function createCart(user_id) {
  try {
    await cart.insertOne({
      _id: user_id,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function findOneCart(user_id) {
  try {
    const cartData = await cart.findOne({ _id: user_id });

    return cartData;
  } catch (error) {
    console.log(error);
  }
}

export async function addItemToCart(user_id, product_id) {
  try {
    const proDetails = await products.findOne({ _id: product_id });

    const updated = await cart.updateOne(
      { _id: user_id },
      {
        $addToSet: {
          items: {
            product_id: proDetails._id,
            name: proDetails.name,
            price: proDetails.price,
            quantity: 1,
            url: proDetails.url,
          },
        },
      }
    );

    console.log(updated);

    if (updated.modifiedCount > 0) {
      return "item added to cart";
    } else if (updated.modifiedCount === 0) {
      const val = await increaseQuantityOfItem(user_id, product_id);
      return val;
    } else {
      return "error occured from adding the item";
    }
  } catch (error) {
    console.log(error);
  }
}

export async function increaseQuantityOfItem(user_id, product_id) {
  const updated = await cart.updateOne(
    { _id: user_id, "items.product_id": product_id },
    { $inc: { "items.$.quantity": 1 } }
  );

  if (updated.modifiedCount > 0) {
    return "incresed item quantity";
  } else {
    return "error occured during the icresing";
  }
}

export async function decreaseQuantityOfItem(user_id, product_id) {
  const updated = await cart.updateOne(
    { _id: user_id, "items.product_id": product_id },
    { $inc: { "items.$.quantity": -1 } }
  );

  if (updated.modifiedCount > 0) {
    return "decresed item quantity";
  } else {
    return "error occured during the decreasing";
  }
}

export async function clearCart(user_id) {
  const updated = await cart.updateOne(
    { _id: user_id },
    { $unset: { items: [] } }
  );
  return updated;
}

export async function updateTotal(user_id) {
  const cartResponse = await findOneCart(user_id);
  const items = cartResponse.items;

  let total_amount = 0;
  for (const item of items) {
    total_amount += item.price * item.quantity;
  }
  console.log(total_amount);

  console.log(user_id)

  const updt = await cart.updateOne(
    { _id: user_id },
    { $set: { subtotal: total_amount } }
  );
  console.log(updt);
}

export async function deleteProInCart(user_id, product_id) {
  const updated = await cart.updateOne(
    { _id: user_id },
    { $pull: { items: { product_id: product_id } } }
  );

  return updated;
}
