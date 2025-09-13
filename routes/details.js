import express from "express";
import { DetailsOfUser, Logout } from "../controllers/details.js";
import { checkSessionData } from "../middlewares/session.js";

//=====================================================================

export const detailsRouter = express.Router();

detailsRouter.get("/", checkSessionData, DetailsOfUser);

detailsRouter.delete("/logout", checkSessionData, Logout);
