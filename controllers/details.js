export async function DetailsOfUser(req, res) {
  try {
    res.json({
      user: req.session.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export function Logout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        //   res.redirect('/login');
        res.json({
          message: "you are logedout",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}
