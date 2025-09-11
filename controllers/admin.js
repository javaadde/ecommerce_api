
import { deleteOneCategory, insertOneCategoy } from "../services/category.js";
import { deleteOrder, findManyOrders, findManyOrdersByDate, updateOrder } from "../services/order.js";
import { addProduct, deleteManyProductsByCategory, deleteProduct, updateProduct } from "../services/products.js";
import { checkPassword, disableUser, enableUser, findManyUsers, findOneUser } from "../services/users.js";



export async function singnInForAdmin(req,res) {


       try {
        
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
       catch (err) {
          console.log(err);
          
       }
       
}


export async function PorductAdding(req,res) {

       try {
           
                   const product = req.body;
                   const inserted = await addProduct(product)
                   res.json({
                       message:inserted
                   })
        
       } catch (error) {
        console.log(errr);
        
       }
}

export async function DeletingProduct(req,res) {

    try {
        
        const id = req.params.id
        const message = await deleteProduct(id)
        res.json({
            message:message,
        })

    } 
    catch (error) {
        console.log(error);
        
    }

}


export async function UpdatingProduct(req,res) {


    try {
        const pro = req.body
       const mess = await updateProduct(pro)
       res.json({
        message:mess,
       })
        
    } catch (error) {
        console.log(error);
        
    }

}


export async function AllUsersForAdmin(req,res) {

    try {
        
        const manyUsers = await findManyUsers()
        res.json({
            allUsers:manyUsers,
        })
    } catch (error) {
        console.log(error);
        
    }

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

    try {
        
            const orders = await findManyOrders()
        
            res.json({
                data:orders,
            })
        
    } catch (error) {
        console.log(error);
        
    }
}


export async function UserDisableOrEnable(req,res) {

    
    const user_id = req.body.id 
    const action = req.params.active


     try{

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
     catch(err){
        console.log(err);
     }
    




}


export async function GetAllOrdersByDate(req,res) {

    const date = new Date( req.body.date );

    console.log(date);
    

    try {
     
        const data = await findManyOrdersByDate(date)
        res.json(data)
         
    } catch (error) {
        
    }
}


export  async function CreateCategory(req,res) {
     try {
      const {name , discription} =  req.body
       const mess =  await insertOneCategoy(name,discription)
       
       res.json({
        message:`${mess} named ${name}`
       })
       
     } catch (error) {
        
     }
}


export async function  DeleteCategory(req,res) {
    try {

        const category_id = req.body.category_id

        const deletedCat = await deleteOneCategory(category_id);
        const deletedPro = await deleteManyProductsByCategory(category_id);
        
        console.log(deletedCat , deletedPro);
        
        if(deletedCat.deletedCount === 1 && deletedPro.deletedCount >= 1){
            res.json({
                message:'deleted sucessly',
            })
        }
        else{
            res.json({
                message:'please make sure the category is exists'
            })
        }

        
    } catch (error) {
        
    }
}