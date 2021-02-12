const router=require('express').Router();
const Auth=require("../http/middleware/Auth");
const restaurantController=require("../http/controller/restaurantController")
const userController=require("../http/controller/usersController")
router.get("/",restaurantController.getRestaurantList);
router.get("/:id",restaurantController.getOneRestaurant);
router.get("/:id",restaurantController.getFoodList);
// router.post("/login",userController.login);
// router.post("/login",controller.register);
module.exports =router