const router=require("express").Router();
const restaurantAdminRoutes=require("./restaurantAdminRoutes")
const superAdminRoutes=require("./superAdminRoutes")
const user=require("./userRoutes")
router.use("/restaurant",restaurantAdminRoutes);
router.use("/restaurant",superAdminRoutes);
router.use("/user",user);
module.exports=router;