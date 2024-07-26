const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
    },
    email:{type:String,},
    password:{type:String},
    role:{
        type:String,
        enum:["buyer","seller","delivery"]
    },
    createdOn:{type:Date,default:new Date().getTime()},
});

module.exports = mongoose.model("User",userSchema);