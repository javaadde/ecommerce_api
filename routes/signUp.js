import express from "express";
import dotenv from "dotenv"; // env config
import session from "express-session"; // session
import MongoStore from "connect-mongo";
import { valResult, valRulesForSingUp } from "../middlewares/validation.js"; // Validatioln rules and result check
import { signUp, userExistsOrNot } from "../controllers/signup.js"; // Controller

// ==================================================

export const signUpRouter = express.Router();

// json url endcode
signUpRouter.use(express.json());
signUpRouter.use(express.urlencoded({ extended: true }));

dotenv.config();
const dbURI = process.env.dbURI;

signUpRouter.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbURI }),
  })
);

// route for inserting doc
signUpRouter.post("/", valRulesForSingUp, valResult, signUp);
signUpRouter.post("/existsUser",userExistsOrNot )
