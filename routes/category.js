import express from 'express'
import { GetAllCategory } from '../controllers/category.js';

export const categoryRouter = express.Router();


categoryRouter.get('/', GetAllCategory)