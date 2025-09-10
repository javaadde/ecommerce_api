import express from 'express';
export const signUpRouter = express.Router();


// json url endcode
signUpRouter.use(express.json())
signUpRouter.use(express.urlencoded({extended:true}))


// env config
import dotenv from 'dotenv'
dotenv.config();
const dbURI = process.env.dbURI;


// session 
import session from 'express-session';
import MongoStore from 'connect-mongo';
signUpRouter.use(session({
    
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl:dbURI }),
       
}))



// Validatioln rules and result check
import { valResult, valRulesForSingUp } from '../middlewares/validation.js';

// Controller
import { signUp } from '../controllers/signup.js';


// route for inserting doc
signUpRouter.post('/',valRulesForSingUp,valResult, signUp );