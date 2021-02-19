const mongoose=require("mongoose")
const config=require('config');
const jwt = require("jsonwebtoken");
const { strict, string } = require("joi");

const basketSchema=mongoose.Schema({
    restauranId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurant"
    },
    restaurantName:String,
    foods:[
        {
            id:String,
            name:String,
            price:Number,
            count:Number
        }
    ]
    
})
const schema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    basket:basketSchema
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