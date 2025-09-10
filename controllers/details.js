
export async function DetailsOfUser(req,res) {
    res.json({
        user:req.session.data
    })
}


export function Logout(req,res){
     delete req.session.data
     res.json({
        message:'logouted'
     })
}