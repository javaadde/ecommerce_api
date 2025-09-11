import { deleteOrder, findManyOrders, updateOrder } from "../services/order.js";
import { addProduct, deleteProduct, updateProduct } from "../services/products.js";
import { checkPassword, disableUser, enableUser, findManyUsers, findOneUser } from "../services/users.js";



export async function singnInForAdmin(req,res) {
        const doc = req.body;
    
        const passwordCurrect = await checkPassword(doc)
        const data = await findOneUser(doc.username)
    
        if(passwordCurrect && data.role === 'admin'){
    
            // saving data to session
            req.session.data = {
            username:data.username,
            email:data.email,
            role:data.role,
            }
    
            res.json({
               message:'your logined success fully'
            })
    
        }
        else{
    
            res.json({
                message:'please ensure you signed up first'
            })
        }
}


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


export async function UserDisableOrEnable(req,res) {

    
    const user_id = req.body.id 
    const action = req.params.active
    

    if(action === 'disable'){

        const disabled = await disableUser(user_id);

        if(disabled.modifiedCount === 1){
         res.json({
            message:'user disabled'
         })
        }
        else{
          res.json({
            message:'user allready disabled'
          })
        } 
    }
    else if(action === 'enable'){
        
        const enabled = await enableUser(user_id);

        if(enabled.modifiedCount === 1){
         res.json({
            message:'user enabled'
         })
        }
        else{
          res.json({
            message:'user allready enaabled'
          })
        } 

    }



}