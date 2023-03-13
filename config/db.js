const mongoose = require("mongoose")

const connections = mongoose.connect(process.env.mongoURL)

module.exports={
    connections
}