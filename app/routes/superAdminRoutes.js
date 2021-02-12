const router=require('express').Router();
const restaurantController=require("../http/controller/restaurantController")
router.get("/",restaurantController.getRestaurantList);
router.get("/:id",restaurantController.getOneRestaurant);
router.post("/",restaurantController.createRestaurant);
router.put("/:id",restaurantController.updateRestaurant);
router.delete("/:id",restaurantController.deleteRestaurant);
module.exports =router