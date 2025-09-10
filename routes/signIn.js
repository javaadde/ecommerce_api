import express from 'express'
export const signInRouter = express.Router();


// json and url endcoded
signInRouter.use(express.json());
signInRouter.use(express.urlencoded({extended:true}))

// session data
import session from 'express-session';
import MongoStore from 'connect-mongo';
signInRouter.use(session({
    
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl:'mongodb://localhost:27017/MyUsers' }),
    
}))



// login handling
import { valResult, valRulesForSignIn } from '../middlewares/validation.js';

// Controller
import { signIn } from '../controllers/signIn.js';

// Route
signInRouter.post('/',valRulesForSignIn, valResult , signIn)