export function checkSessionData(req, res, next) {
  const user = req.session.data;

  if (user) {
    next();
  } else {
    res.json({
      message: "please login first",
    });

    // res.redirect('/login')
  }
}

export function checkIsAdminOrNot(req, res, next) {
  try {
    if (req.session.data.role === "admin") {
      next();
    } else {
      res.status(401).json({
        message: "Un otherized Page",
      });
    }
  } catch (error) {
    res.status(401);
    res.json({
      message: "un otherized",
    });

    // console.log(error);
  }
}
