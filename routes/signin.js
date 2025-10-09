import express from "express";
import { valResult, valRulesForSignIn } from "../middlewares/validation.js"; // login handling
import { signInForUser } from "../controllers/signin.js"; // Controller
import session from "express-session"; // session data
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

// ==============================================================
export const signInRouter = express.Router();
dotenv.config();

signInRouter.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
    store: MongoStore.create(
      { mongoUrl: process.env.MONGO_URL },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        tls: true,
      }
    ),
  })
);

// json and url endcoded
signInRouter.use(express.json());
signInRouter.use(express.urlencoded({ extended: true }));

// Route
signInRouter.post("/", valRulesForSignIn, valResult, signInForUser);
