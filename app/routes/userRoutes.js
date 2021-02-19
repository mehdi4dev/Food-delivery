const router=require('express').Router();
const Auth=require("../http/middleware/Auth");
const User=require("../http/middleware/user");
const restaurantController=require("../http/controller/restaurantController")
const userController=require("../http/controller/usersController")
router.get("/",restaurantController.getRestaurantList);
router.get("/:id",restaurantController.getOneRestaurant);
router.get("/:id",restaurantController.getFoodList);
router.post("/login",[Auth,User],userController.login);
router.post("/register",userController.register);
router.post("/addcomment/:id",[Auth,User],restaurantController.addComment);
router.post("/basket",[Auth,User],userController.updateBasket);
module.exports =router