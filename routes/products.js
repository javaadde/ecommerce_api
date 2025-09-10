import express from 'express'
export const productsRouter = express.Router();

// json
productsRouter.use(express.json())
productsRouter.use(express.urlencoded({extended:true}))

// Controller
import { productByCategory, productsHome } from '../controllers/products.js';

// Routes =>

// get all products
productsRouter.get('/', productsHome)

// get by category
productsRouter.get('/:category', productByCategory)
