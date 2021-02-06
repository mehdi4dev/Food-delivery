const restaurantModel=require("../../model/restaurantModel")
const {validateCreateRestaurant,validateUpdateRestaurant}=require("../validator/restaurantValidator")
const _=require("lodash")
const bcrypt=require("bcrypt");
const { set } = require("lodash");
class restaurantController{
    async getList(req,res){
        const restaurantList=await restaurantModel.find().select("name descrption score pic address adminUserName").limit(20);
        res.send(restaurantList)

    }
    async getOne(req,res){
        const id=req.params.id;
        const result=await restaurantModel.findById(id).select("-adminPassword");
        if(!result) return res.status(404).send("not found");

        res.send(result);
    }
    async create(req,res){
        const {error}=validateCreateRestaurant(req.body)
        if(error) return res.status(400).send(error.message)
        let restaurant=new restaurantModel( _.pick(req.body,["name","description","address","adminUserName","adminPassword"]));
        const salt=await bcrypt.genSalt(10);
        restaurant=await restaurant.save();
        res.send(restaurant)
    }
    async update(req,res){
        const id=req.params.id;
        const {error}=validateUpdateRestaurant(req.body)
        if(error) return res.status(400).send(error.message)
        const result=await restaurantModel.findByIdAndUpdate(id,{
            $set: _.pick(req.body,["name","description","address","adminUserName","adminPassword"])
            
        },{new:true})
        if(!result) return res.send("not found");
        res.send(_.pick(result,["name","description","address","adminUserName","adminPassword"]));
    }
    async delete(req,res){
        const id=req.params.id;
        await restaurantModel.findByIdAndRemove(id);
        res.status(200).send()
    }
}
module.exports= new restaurantController;