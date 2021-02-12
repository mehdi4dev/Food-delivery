const mongoose=require("mongoose");
const config=require("config")
const jwt=require("jsonwebtoken");

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
    score:{type:Number,required:true,default:0},
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
schema.methods.generateAuthToken = function () {
    const data = {
      _id: this._id,
      name: this.adminUserName,
      role: "restaurant",
    };
  
    return jwt.sign(data, config.get('jwtPrivateKey'));
  };
const model=mongoose.model("restaurant",schema);  

module.exports = model;