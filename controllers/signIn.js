import { checkPassword, findOneUser } from "../services/users.js";


export async function signInForUser(req,res) {
    
    const doc = req.body;
    console.log(doc);

    const passwordCurrect = await checkPassword(doc)
    const data = await findOneUser(doc.username)

    if(passwordCurrect && data.role === 'user'){

        // saving data to session
        req.session.data = {
        username:data.username,
        email:data.email,
        role:data.role,
        }

        res.json({
           message:'your logined success fully'
        })

    }
    else{

        res.json({
            message:'please ensure you signed up first'
        })
    }
}