const router=require('express').Router();
const controller=require("../http/controller/restaurantController")
const Auth=require("../http/middleware/Auth");
const restaurantAdmin = require('../http/middleware/restaurantAdmin');
router.get("/",controller.getList);
router.get("/:id",controller.getOne);
router.post("/",controller.create);
router.put("/:id",controller.update);
router.delete("/:id",controller.delete);
router.post("/login",controller.login);
router.post("/foods/addfood",[Auth,restaurantAdmin],controller.addFood);
router.get("/foods/getfoodlist",[Auth,restaurantAdmin],controller.getFoodList);
module.exports =router