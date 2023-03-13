const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../model/user.model");
const { BlacklistModel } = require("../model/blacklist");
const { authentication } = require("../config/middleware/authentication");

const userRouter = express.Router();

//user register
userRouter.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const data = await UserModel.findOne({ email });

  if (data) {
    res.send({ msg: "user is already registered" });
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        console.log(err);
        res.send({ msg: "something went wrong", err: err.message });
      } else {
        const user = new UserModel({ name, email, password: hash, role });
        await user.save();
        res.send("User is registered");
      }
    });
  }
});


//login 
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
//   console.log(process.env.normal_token);

  const data = await UserModel.findOne({ email });
  if (data) {
    bcrypt.compare(password, data.password, function (err, result) {
      if (err) {
        res.send({ msg: "something went wrong", err: err.message });
      } else {
        
        var normal_token = jwt.sign(
          { userid: data._id },
          process.env.normal_token,
          { expiresIn: 180 }
        );
        
        var ref_token = jwt.sign({ userid: data._id }, process.env.ref_token, {
          expiresIn: 600,
        });

        res.send({
          msg: "user is logined in",
          normal_token: normal_token,
          ref_token: ref_token,
        });
      }
    });
  }
});


//logout by blacklist
userRouter.post("/logout", authentication, async (req, res) => {
  const token = req.headers.authorization;
  try {
    //post in blacklist
    const user = new BlacklistModel({ token });
    await user.save();

    res.send("logout");
  } catch (error) {
    console.log(err);
    res.status(401).send({msg : "something went wrong",error : "error.message"})

  }
});


//refresh the token
userRouter.get("/ref_token", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.ref_token);
    // console.log(decoded)
    if (decoded) {
        //create new token
      var normal_token = jwt.sign(
        { userid: decoded.userid },
        process.env.normal_token,
        { expiresIn: 60 }
      );
      res.send({ normal_token: normal_token });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({msg : "something went wrong",error : "error.message"})

  }
});



module.exports = {
  userRouter,
};
