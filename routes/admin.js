import express from 'express';
import { valResult, valRulesForProducts } from '../middlewares/validation.js'; // Validation
// Controllers
import {
    AllUsersForAdmin,
    CreateCategory,
    DeleteAnOrder,
    DeleteCategory,
    DeletingProduct,
    GetAllOrders,
    GetAllOrdersByDate,
    PorductAdding,
     singnInForAdmin,
     UpdateAnOrder, 
    UpdatingProduct, 
    UserDisableOrEnable
} from '../controllers/admin.js';
import { checkIsAdminOrNot } from '../middlewares/session.js';

// =======================================================================

export const adminRouter = express.Router()

// json converting
adminRouter.use(express.json());
adminRouter.use(express.urlencoded({extended:true}))


// SIGN IN
// ===============
adminRouter.post('/signin', singnInForAdmin)


//  MIDDLEWARE
adminRouter.use(checkIsAdminOrNot);


// PRODUCTS CRUD 
// =================


adminRouter.post('/products/add',valRulesForProducts,valResult,PorductAdding)  // adding products
adminRouter.delete('/products/delete/:id', DeletingProduct)  // deleting products
adminRouter.put('/products/update', UpdatingProduct)  // updating products



//  GET ALL USERS
// =================

adminRouter.get('/users',AllUsersForAdmin);
adminRouter.put('/user/:active', UserDisableOrEnable)  // user enable disable


//  CRUD ORDERS AND GETS
// =================

adminRouter.get('/orders' , GetAllOrders); // all orders by default
adminRouter.get('/orders/filter/date', GetAllOrdersByDate)

adminRouter.put('/order/update/:id',UpdateAnOrder);
adminRouter.delete('/order/delete/:id',DeleteAnOrder);


//  CATEGORY
// ===================

adminRouter.post('/category/add', CreateCategory)
adminRouter.delete('/category/delete', DeleteCategory)