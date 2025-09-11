
export function checkSessionData(req,res,next){

    const user =  req.session.data;

    if(user){
        next()
    }
    else{
        res.json({
            message:'please login first'
        })

        // res.redirect('/login')
    }

} 


export function checkIsAdminOrNot(req,res,next){

    
    try {
        
        if(req.session.data.role === 'admin'){
          next()
        }
        else{
    
            res.status(404)
            .json({
                message:'not fount the page'
            })
        }

    } catch (error) {

        res.status(404)
        res.json({
            message:'page not fount'
        })
       
        // console.log(error);
        
    }



  
}
