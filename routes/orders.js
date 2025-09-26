import express from "express";
import { CancelOrder, GetUserOrders, OrderById, PlacingAnOrder } from "../controllers/orders.js";

// ==============================================================
export const ordersRouter = express.Router();

// json parsing
ordersRouter.use(express.json());
ordersRouter.use(express.urlencoded({ extended: true }));

// Routes
ordersRouter.get("/", GetUserOrders);
// placing an order
ordersRouter.post("/", PlacingAnOrder);
// order by id
ordersRouter.get("/:id", OrderById) ;
// cancel a order
ordersRouter.patch("/cancell/:id" ,CancelOrder);

