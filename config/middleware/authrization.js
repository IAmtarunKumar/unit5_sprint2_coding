const authrization = (permetedrole1, permetedrole2) => {
  return (req, res, next) => {
    const role = req.user.role;
    console.log(role, permetedrole1);
    // console.log(req.user.email)
    // console.log(role,permetedrole1)

    //check if role is equal to permeterrole
    if (role === permetedrole1) {
      next();
    } else {
      res.status(401).send("Unauthorised");
    }
  };
};

module.exports = {
  authrization,
};
