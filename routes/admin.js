import express from 'express'


// Validation
import { valResult, valRulesForProducts } from '../middlewares/validation.js';

// Controllers
import { AllUsersForAdmin, DeleteAnOrder, DeletingProduct, GetAllOrders, PorductAdding, UpdateAnOrder, UpdatingProduct } from '../controllers/admin.js';
import { checkIsAdminOrNot } from '../middlewares/session.js';

export const adminRouter = express.Router()

// json converting
adminRouter.use(express.json());
adminRouter.use(express.urlencoded({extended:true}))

//  MIDDLEWARE
adminRouter.use(checkIsAdminOrNot);


// =================
// PRODUCTS CRUD 
// =================

// adding products
adminRouter.post('/products/add',valRulesForProducts,valResult,PorductAdding)

// deleting products
adminRouter.delete('/products/delete/:id', DeletingProduct)

// updating products
adminRouter.put('/products/update', UpdatingProduct)



// =================
//  GET ALL USERS
// =================

adminRouter.get('/users',AllUsersForAdmin);


// =================
//  CRUD ORDERS AND GETS
// =================

adminRouter.get('/orders' , GetAllOrders);

adminRouter.put('/order/update/:id',UpdateAnOrder);
adminRouter.delete('/order/delete/:id',DeleteAnOrder);
