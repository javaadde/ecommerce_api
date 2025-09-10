

// Services
import { insertDoc } from '../services/users.js';
import { createCart } from '../services/cart.js';


export async function signUp(req,res) {
     const data = req.body; 
    const message = await insertDoc(data);
    
    // saving data to session
    req.session.data = {
        username:data.username,
        email:data.email,
    }

    // creating a cart for the user
    await createCart(data.username)

    res.json(message)

    // res.redirect('/home')
}