import express from "express";
import dotenv from "dotenv"; // env config
import session from "express-session"; // session
import MongoStore from "connect-mongo";
import { valResult, valRulesForSingUp } from "../middlewares/validation.js"; // Validatioln rules and result check
import { signUp, userExistsOrNot } from "../controllers/signup.js"; // Controller

// ==================================================
export const signUpRouter = express.Router();

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

// json url endcode
signUpRouter.use(express.json());
signUpRouter.use(express.urlencoded({ extended: true }));

signUpRouter.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URL }),
  })
);

// route for inserting doc
signUpRouter.post("/", valRulesForSingUp, valResult, signUp);
signUpRouter.post("/existsUser",userExistsOrNot )
