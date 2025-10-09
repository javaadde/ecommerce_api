// Services
import { insertDoc, isUser } from "../services/users.js";
import { createCart } from "../services/cart.js";

export async function signUp(req, res) {
  try {
    const data = req.body;
    const message = await insertDoc(data);

    // saving data to session
    req.session.data = {
      username: data.username,
      email: data.email,
      role: "user",
    };

    // creating a cart for the user
    await createCart(data.username);

    res.json(message);

    // res.redirect('/home')
  } catch (err) {
    console.log(err);
  }
}

export async function userExistsOrNot(req,res) {
  try {

    const name = req.body.name
    console.log(name);
    
    const isAvailable = await isUser(name) 

    if(isAvailable){

      res.json({
        isAvailable:false
      })
    }

    else{
       res.json({
        isAvailable:true
       })
    }
    
  } catch (error) {
    console.log(error);
    
  }
}
