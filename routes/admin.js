import express from 'express'


// Validation
import { valResult, valRulesForProducts } from '../middlewares/validation.js';

// Controllers
import {
    AllUsersForAdmin,
    DeleteAnOrder,
    DeletingProduct,
    GetAllOrders,
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

//  MIDDLEWARE
adminRouter.use(checkIsAdminOrNot);


// SIGN IN
// ===============
adminRouter.get('/signin', singnInForAdmin)


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

adminRouter.get('/orders' , GetAllOrders);

adminRouter.put('/order/update/:id',UpdateAnOrder);
adminRouter.delete('/order/delete/:id',DeleteAnOrder);
