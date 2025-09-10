import { deleteOrder, findManyOrders, updateOrder } from "../services/order.js";
import { addProduct, deleteProduct, updateProduct } from "../services/products.js";
import { findManyUsers } from "../services/users.js";



export async function PorductAdding(req,res) {

        const product = req.body;
        const inserted = await addProduct(product)
        res.json({
            message:inserted
        })
}

export async function DeletingProduct(req,res) {

        const id = req.params.id
        const message = await deleteProduct(id)
        res.json({
            message:message,
        })
}


export async function UpdatingProduct(req,res) {

    const pro = req.body
   const mess = await updateProduct(pro)
   res.json({
    message:mess,
   })
}


export async function AllUsersForAdmin(req,res) {
    const manyUsers = await findManyUsers()
    res.json({
        allUsers:manyUsers,
    })
}


export async function UpdateAnOrder(req,res) {
        const order_id = req.params.id;
        const statusInp = req.body.status;

        try{
            const updated = await updateOrder(order_id,statusInp);
            
            res.json(
                {Status:statusInp}
            )
        }
        catch(err){
            console.log(err);
        }
}



export async function DeleteAnOrder(req,res) {

        const order_id = req.params.id;

        try{
            
            const deleted = await deleteOrder(order_id);

            console.log(deleted);
            
            res.json({
                msg:'deleted'
            })
        }
        catch(err){
            console.log(err);
            
        }
}


export async function GetAllOrders(req,res) {
    const orders = await findManyOrders()

    res.json({
        data:orders,
    })
}