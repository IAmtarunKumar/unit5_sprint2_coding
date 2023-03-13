const express = require("express");
require("dotenv").config();
const { userRouter } = require("./route/user.route");
const { connections } = require("./config/db");
const { productRouter } = require("./route/product.route");
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("check")
})

//user router
app.use("/users", userRouter);

//product router
app.use("/product",productRouter)


app.listen(process.env.port, async () => {
  try {
    await connections;
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`${process.env.port} port is working`);
});
