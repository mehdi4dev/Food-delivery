const restaurantModel=require("../../model/restaurantModel")
const {validateCreateRestaurant,validateUpdateRestaurant,foodValidator,commentValidator}=require("../validator/restaurantValidator")
const _=require("lodash")
const bcrypt=require("bcrypt");
const { set } = require("lodash");
class restaurantController{
    async getRestaurantList(req,res){
        const restaurantList=await restaurantModel.find().select("name descrption score pic address adminUserName").limit(20);
        res.send(restaurantList)

    }
    async getOneRestaurant(req,res){
        const id=req.params.id;
        const result=await restaurantModel.findById(id).select("-adminPassword");
        if(!result) return res.status(404).send("not found");

        res.send(result);
    }
    async createRestaurant(req,res){
        const {error}=validateCreateRestaurant(req.body)
        if(error) return res.status(400).send(error.message)
        let restaurant=new restaurantModel( _.pick(req.body,["name","description","address","adminUserName","adminPassword"]));
        const salt=await bcrypt.genSalt(10);
        restaurant.adminPassword=await bcrypt.hash(restaurant.adminPassword,salt);
        restaurant=await restaurant.save();
        res.send(restaurant)
    }
    async updateRestaurant(req,res){
        const id=req.params.id;
        const {error}=validateUpdateRestaurant(req.body)
        if(error) return res.status(400).send(error.message)
        const result=await restaurantModel.findByIdAndUpdate(id,{
            $set: _.pick(req.body,["name","description","address","adminUserName","adminPassword"])
            
        },{new:true})
        if(!result) return res.send("not found");
        res.send(_.pick(result,["name","description","address","adminUserName","adminPassword"]));
    }
    async deleteRestaurant(req,res){
        const id=req.params.id;
        console.log(id);
        await restaurantModel.findByIdAndRemove(id) 
        res.status(200).send()
    }
    async addFood(req,res){
        const { error }=foodValidator(req.body);
        if(error) return res.status(400).send({ message: error.message });

        let restaurant= await restaurantModel.findById(req.user._id);
        if(!restaurant) return res.status(404).send("resturant does not found")
        restaurant.menu.push( _.pick(req.body,["name","description","price"]))
        restaurant=await restaurant.save();
        res.send(true);
    }
    async getFoodList(req,res){
        const restaurant=await restaurantModel.findById(req.user._id);
        if (!restaurant)
        return res.status(404).send("resturant does not found")

        const food=restaurant.menu;

        res.send(food)

    }
    async deleteFood(req,res){
        const id=req.user._id;
        const foodId=req.params.id;
        const restaurant=await restaurantModel.findById(id);
        restaurant.menu.id(foodId).remove();
        await restaurant.save()
        res.status(200).send()
    }
    async updateFood(req,res){
        
        let restaurant=await restaurantModel.findById(req.user._id);
        if(!restaurant) return res.status(400).send({message:err.message})
        const foodId=req.params.id
        const foundFood=restaurant.menu.id(foodId);
        console.log(foundFood);
        if(foundFood)
     {
       if(req.body.name)
        foundFood.name = req.body.name;
        if(req.body.description)
        foundFood.description = req.body.description;
        if(req.body.price)
        foundFood.price = req.body.price;
     }
     console.log(restaurant);
        restaurant=await restaurant.save();
        res.status(200).send(restaurant.menu)
    }
    async addComment(req,res){
        const {error}=commentValidator(req.body);
        if(error) return res.status(200).send({message:error.message})

        let restaurant=await restaurantModel.findById(req.params.id)
        if(!restaurant) return res.status(400).send("the restaurant does not found")
        console.log(restaurant);
         restaurant.comments.push(_.pick(req.body,["user","text","score"]))
        restaurant=await restaurant.save();
        res.status(200).send(true)
    }
    
}
module.exports= new restaurantController;