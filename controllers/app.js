// export


export function IsLogined(req,res){
    console.log(req.session);
    
    const user = req.session.data;
    console.log(user);

  if (user) {
    res.json({
        is:true,
        role:user.role,
    })
  } else {
   res.json({
    is:false
   })
  }
}