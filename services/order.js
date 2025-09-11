import { orders } from "../models/orders.js";


export async function storeUserData(subtotal,user_id,cartData,address) {
   const placed = await orders.insertOne({
     user_id:user_id,
     items:cartData.items,
     total:subtotal,
     address:address,
   })

   return placed
 
}


export async function updateOrder(order_id,statusInp) {
    const updt = await orders.updateOne({_id:order_id},{$set:{status:statusInp}})
    return updt
}


export async function deleteOrder(order_id) {
    const dlt =  await orders.deleteOne({_id:order_id});
    return dlt
}


export async function findManyOrders() {
    const data = await orders.find()
    return data
}

export async function findManyOrdersOfAnUser(user_id) {
    const data = await orders.find({user_id:user_id});
    return data
}


export async function findManyOrdersByDate(date) {
    const data = await orders.find({date:{$lte:date}})
    return data
}

