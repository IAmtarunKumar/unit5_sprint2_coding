const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../../model/blacklist");
const { UserModel } = require("../../model/user.model");
const authentication = async (req, res, next) => {
  try {
    //token
    const token = req.headers.authorization;
    // console.log(token)
    //check token in blacklist
    const check_token = await BlacklistModel.findOne({ token });
    if (check_token) {
      res.send({ msg: "Unauthorised blacklist token" });
    } else {
      const decoded = jwt.verify(token, process.env.normal_token);
      if (decoded) {
        console.log(decoded);
        const user = await UserModel.findOne({ _id: decoded.userid });
        //set user detail in req.user 
        req.user = user;
        next();
      } else {
        res.send("please login again");
      }
    }
  } catch (error) {
    console.log(error.name);
    //if token is expire
    if (error.name === "TokenExpiredError") {
      res.status(401).send("access token is expire");
    } else {
      console.log(error);
      res.status(401).send("Unauthorised");
    }
  }
};

module.exports = {
  authentication
};
