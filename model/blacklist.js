//blacklist schema model
const mongoose = require("mongoose")

//schema

const blacklistSchema = mongoose.Schema({
    token : {
        type :  String,
        required : true
    }
})

//model

const BlacklistModel = mongoose.model("blacklist",blacklistSchema)

module.exports={
    BlacklistModel
}