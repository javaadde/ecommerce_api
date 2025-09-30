import express from "express";
import { productByCategory, productsHome, searchProducts } from "../controllers/products.js"; // ControllerS

// ==============================================================

export const productsRouter = express.Router();

// json
productsRouter.use(express.json());
productsRouter.use(express.urlencoded({ extended: true }));

// Routes =>

// get all products
productsRouter.get("/", productsHome);

// get by category
productsRouter.get("/:category", productByCategory);

// get all by search query
productsRouter.get("/", searchProducts);
