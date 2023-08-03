const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
     title:{
        type:String,
        required: true
        
     },
     description:{
         type: String,
         required: true
     },
     status:{
        type:String,
        required: ["active", "close"]
     }
})


module.exports = mongoose.model("List",listSchema);