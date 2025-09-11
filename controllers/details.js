
export async function DetailsOfUser(req,res) {
    res.json({
        user:req.session.data
    })
}


export function Logout(req,res){

    req.session.destroy((err) => {

    if (err) {
      console.log(err);
    } else {
    //   res.redirect('/login');
       res.json({
        message:'you are logedout'
       })
    }
  });
}