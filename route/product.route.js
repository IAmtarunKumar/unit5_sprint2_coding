const express = require("express")
const {ProductModel} = require("../model/product.model")
const {authentication} = require("../config/middleware/authentication")
const {authrization} =require("../config/middleware/authrization")
const productRouter = express.Router()


productRouter.get("/products",authentication ,async(req,res)=>{
    try {
        const all_product = await ProductModel.find()
    res.send(all_product) 
    } catch (error) {
        console.log(error)
        res.status(400).send({msg : "something went wrong",error : "error.message"})

    }
   
})

productRouter.post("/addproducts",authentication,authrization("seller") , async(req,res)=>{
    const {product ,price} = req.body
    try {
        const user = new ProductModel({product,price})
        await user.save()
        res.send("products is created")
    } catch (error) {
        console.log(error)
        res.status(401).send({msg : "something went wrong",error : "error.message"})

    }
   
})


productRouter.delete("/deleteproducts/:id" ,authentication,authrization("seller"), async(req,res)=>{
const userid = req.params.id
// console.log(id)
try {
    const data =  await ProductModel.findByIdAndDelete({_id : userid})
    res.send("product is deleted")  
} catch (error) {
    console.log(error)
    res.status(400).send({msg : "something went wrong",error : "error.message"})
}

})

module.exports={
    productRouter
}