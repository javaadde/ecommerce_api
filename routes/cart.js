import express from 'express';
import { AddtoCart, cartHome, operationOnItems } from '../controllers/cart.js'; // Controller
import { checkAcessToCart } from '../middlewares/acess.js';


// ================================================================================

export const cartRouter = express.Router();

// json parse
cartRouter.use(express.json());
cartRouter.use(express.urlencoded({extended:true}));

// MIDDLEWARE
cartRouter.use(checkAcessToCart)

// home route to see all products and total value in the caryt
cartRouter.get('/', cartHome);

// route for adding items to cart
cartRouter.patch('/add/:pro_id', AddtoCart)

// route for increasing and decreasing the quantity of the item
cartRouter.patch('/quantity/:operation', operationOnItems)