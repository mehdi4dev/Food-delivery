const mongoose=require("mongoose");


const schemaComment=new mongoose.Schema({
    user:{type:String,required:true},
    text:{type:String,required:true},
    score:Number
})

const schemaFood=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    pic:String,
    score:Number,
    comments:[schemaComment]
})
const schema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    score:{
        type:Number,
        default:0
    },
    pic:String,
    address:String,
    comments: [schemaComment],
    menu:[schemaFood],
    adminUserName:{type:String,required:true},
    adminPassword:{type:String,required:true}   
})

const model=mongoose.model("restaurant",schema);  
module.exports = model;