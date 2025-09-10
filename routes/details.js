import express from 'express'
export const detailsRouter = express.Router();
import { DetailsOfUser, Logout } from '../controllers/details.js';


detailsRouter.get('/', DetailsOfUser)

detailsRouter.delete('/logout',Logout)