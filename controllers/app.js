// export


export function IsLogined(req,res){
    console.log(req.session);
    
    const user = req.session.data;

  if (user) {
    res.json({
        is:true
    })
  } else {
   res.json({
    is:false
   })
  }
}