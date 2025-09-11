
export async function checkAcessToCart(req,res,next) {
    
        if(req.session.data.role === 'admin'){
            return res.json({
                message:'you dont have cart you are admin'
            })
        }

      next();  
}