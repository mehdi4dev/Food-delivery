const mongoose=require("mongoose")
const config=require('config');
const jwt = require("jsonwebtoken");

const schema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})
schema.methods.generateAuthToken=function () {
    const data={
        id:this._id,
        name:this.name,
        role:"user"
    }
    return jwt.sign(data,config.get('jwtPrivateKey'))
}
const model=mongoose.model("users",schema)
module.exports = model;