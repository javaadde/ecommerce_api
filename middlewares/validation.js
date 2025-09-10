import { body,validationResult } from "express-validator";

export const valRulesForSingUp = [

     body('username')
     .notEmpty().withMessage('pleae enter The User Name')
     .isLength({min:3}).withMessage('please take username atleast three charecters'),

     body('password')
     .isLength({min:6}).withMessage('please choice a password that has atleast six charecres'),

     body('email')
     .notEmpty().withMessage('please enter your email')
     .isEmail()

]


export const valRulesForSignIn = [

     body('username')
     .notEmpty().withMessage('pleae enter The User Name')
     .isLength({min:3}).withMessage('please take username atleast three charecters'),

     body('password')
     .isLength({min:6}).withMessage('please choice a password that has atleast six charecres'),
]

export const valRulesForProducts = [
      body('_id')
     .notEmpty().withMessage('pleae enter The product_id Name'),

      body('name')
     .notEmpty().withMessage('pleae enter The Name'),

      body('price')
     .notEmpty().withMessage('pleae enter The price'),

      body('category')
     .notEmpty().withMessage('pleae enter The category'),

      body('url')
     .notEmpty().withMessage('pleae enter The url')
     .isURL()

]


export function valResult(req,res,next){

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else{
            next()
        }   
} 

