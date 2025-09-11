import express from 'express';
import { GetUserOrders, PlacingAnOrder } from '../controllers/orders.js';

// ==============================================================
export const ordersRouter = express.Router();

// json parsing
ordersRouter.use(express.json())
ordersRouter.use(express.urlencoded({extended:true}));


// Routes
ordersRouter.get('/', GetUserOrders)
// placing an order
ordersRouter.post('/', PlacingAnOrder)