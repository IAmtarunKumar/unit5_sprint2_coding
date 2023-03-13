const mongoose = require("mongoose")

//schema

const userSchema = mongoose.Schema({
    name : {
        type :  String,
        required : true
    },
    email : {
        type :  String,
        required : true
    },
    password : {
        type :  String,
        required : true
    },
    role : {
        type :  String,
        required : true,
        default : "user",
        enum : ["seller" , "user"]
    },
})

//model

const UserModel = mongoose.model("user",userSchema)

module.exports={
    UserModel
}