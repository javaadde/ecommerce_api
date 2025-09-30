import { deleteOneCategory, findOneCategory, insertOneCategoy } from "../services/category.js";
import multer from "multer";
import cloudinary from "../config/cloudiney.js";

import {
  deleteOrder,
  findAllOrdersCount,
  findManyOrders,
  findManyOrdersByDate,
  findManyOrdersOfAnUser,
  findOrdersByStatus,
  totalRevenew,
  updateOrder,
} from "../services/order.js";

import {
  addProduct,
  deleteManyProductsByCategory,
  deleteProduct,
  findAllProducts,
  findAllProductsCount,
  findPublicId,
  updateProduct,
} from "../services/products.js";

import {
  checkPassword,
  disableUser,
  enableUser,
  findAllUsersCount,
  findManyUsers,
  findOneUser,
} from "../services/users.js";





// ========================================================


export async function singnInForAdmin(req, res) {
  try {
    const doc = req.body;
    const passwordCurrect = await checkPassword(doc);
    const data = await findOneUser(doc.username);

    if (passwordCurrect && data.role === "admin") {
      // saving data to session
      req.session.data = {
        username: data._id,
        email: data.email,
        role: data.role,
      };

      res.json({
        message: "your logined success fully",
      });
    } else {
      res.json({
        message: "please ensure you signed up first",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function PorductAdding(req, res) {

  console.log('came in');
  

  try {

     let product = req.body;

    console.log(product);
    
      const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                { folder: 'my_uploads' } 
      );
      product.url = result.secure_url;
      product.public_id = result.public_id;
 

      console.log(product);
      
     
    
    const inserted = await addProduct(product);
    res.json({
      message: inserted,
    });

  } catch (error) {
    console.log(error);
  }
}

export async function DeletingProduct(req, res) {
  try {
    const id = req.params.id;
    const message = await deleteProduct(id);
    res.json({
      message: message,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function UpdatingProduct(req, res) {
  try {
    const pro = req.body;


    for (const key in pro) {
      
       if(pro[key] === ""){
         delete pro[key];
       }
      
    }

    const public_id = await findPublicId(pro._id)
    
    if(req.file){
      
       const result = await cloudinary.uploader.upload(
  `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
  {
    public_id: public_id, // same id as before
    overwrite: true,              // force overwrite
    invalidate: true              // invalidate cached versions
  }
);
      pro.url = result.secure_url;
      
    }
    
    console.log(pro);

    const mess = await updateProduct(pro);
    res.json({
      message: mess,
    });


  } catch (error) {
    console.log(error);
  }
}


export async function AllUsersForAdmin(req, res) {
  try {
    const manyUsers = await findManyUsers();
    res.json({
      allUsers: manyUsers,
    });
  } catch (error) {
    console.log(error);
  }
}


export async function UpdateAnOrder(req, res) {
  const order_id = req.params.id;
  const statusInp = req.body.status;

  try {
    const updated = await updateOrder(order_id, statusInp);

    res.json({ Status: statusInp });
  } catch (err) {
    console.log(err);
  }
}



export async function DeleteAnOrder(req, res) {
  const order_id = req.params.id;

  try {
    const deleted = await deleteOrder(order_id);

    console.log(deleted);

    res.json({
      msg: "deleted",
    });
  } catch (err) {
    console.log(err);
  }
}



export async function GetAllOrders(req, res) {
  try {
    const orders = await findManyOrders();

    res.json({
      data: orders,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function UserDisableOrEnable(req, res) {
  const user_id = req.body.id;
  const action = req.params.active;

  try {
    if (action === "disable") {
      const disabled = await disableUser(user_id);

      if (disabled.modifiedCount === 1) {
        res.json({
          message: "user disabled",
        });
      } else {
        res.json({
          message: "user allready disabled",
        });
      }
    } else if (action === "enable") {
      const enabled = await enableUser(user_id);

      if (enabled.modifiedCount === 1) {
        res.json({
          message: "user enabled",
        });
      } else {
        res.json({
          message: "user allready enaabled",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export async function GetAllOrdersByDate(req, res) {
  const date = new Date(req.body.date);

  console.log(date);

  try {
    const data = await findManyOrdersByDate(date);
    res.json(data);
  } catch (error) {}
}


export async function CreateCategory(req, res) {
  try {
    const { name, discription,url } = req.body;
    const mess = await insertOneCategoy(name, discription,url);

    res.json({
      message: `${mess} named ${name}`,
    });
  } catch (error) {}
}

export async function DeleteCategory(req, res) {

  try {
    const category_id = req.params.name;
    console.log(category_id);
    

    const category = await findOneCategory(category_id);

    const deletedCat = await deleteOneCategory(category_id);

    const category_name = category.name;
    console.log(category, "name", category_name);
    
    const deletedPro = await deleteManyProductsByCategory(category_name);



    console.log(deletedCat, deletedPro);

    if (deletedCat.deletedCount === 1 && deletedPro.deletedCount >= 1) {
      res.json({
        message: "deleted sucessly",
      });
    }
    else if(deletedCat.deletedCount === 1){
       res.json({
          message:"deleted the empty category"
       })
    } 
    else {
      res.json({
        message: "please make sure the category is exists",
      });
    }
  } catch (error) {}
}

export async function isAdmin(req,res) {

   try{

        
        const total_products = await findAllProductsCount() 
        const total_orders = await findAllOrdersCount()
        const registered_users = await findAllUsersCount()
        const total_revenew = await totalRevenew();

        
        
        res.json({
            isAdmin:true,
            // total_revenew:total_revenew[0].sum,
            registered_users:registered_users,
            total_orders:total_orders,
            total_products:total_products,
        })
    }
    catch(err){
        console.log(err);
    }

}

export async function GetAllOrdersByUser(req,res) {
  try {
    
    const id = req.params.id
    const data = await findManyOrdersOfAnUser(id)
     res.json(data)

  } catch (error) {
    console.log(error);
    
  }
}


export async function GetAllOrderByStatus(req,res) {
   const status = req.params.status;
   try {
    

     const data = await findOrdersByStatus(status);

      res.json(data)

   } catch (error) {
    console.log(error);
   }
}