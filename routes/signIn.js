import express from "express";
import { valResult, valRulesForSignIn } from "../middlewares/validation.js"; // login handling
import { signInForUser } from "../controllers/signin.js"; // Controller
import session from "express-session"; // session data
import MongoStore from "connect-mongo";

// ==============================================================
export const signInRouter = express.Router();

signInRouter.use(
  session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,   
    sameSite: "lax" 
  },
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/MyUsers" }),
  })
);

// json and url endcoded
signInRouter.use(express.json());
signInRouter.use(express.urlencoded({ extended: true }));

// Route
signInRouter.post("/", valRulesForSignIn, valResult, signInForUser);
