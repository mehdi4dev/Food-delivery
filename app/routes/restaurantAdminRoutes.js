const router=require('express').Router();
const restaurantController=require("../http/controller/restaurantController")
const usersController=require("../http/controller/usersController")
const Auth=require("../http/middleware/Auth");
const restaurantAdmin = require('../http/middleware/restaurantAdmin');
router.post("/login",usersController.login);
router.post("/foods/addfood",[Auth,restaurantAdmin],restaurantController.addFood);
router.get("/foods/getfoodlist",[Auth,restaurantAdmin],restaurantController.getFoodList);
router.delete("/foods/deletefood/:id",[Auth,restaurantAdmin],restaurantController.deleteFood);
router.put("/foods/updatefood/:id",[Auth,restaurantAdmin],restaurantController.updateFood);
module.exports =router