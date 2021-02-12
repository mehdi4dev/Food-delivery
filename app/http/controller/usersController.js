const restaurantModel=require("../../model/restaurantModel")
const {loginValidator}=require("../validator/restaurantValidator")
const _=require("lodash")
const bcrypt=require("bcrypt");

class usersController{

    
    async login(req,res){
        const { error } = loginValidator(req.body);
        if (error) return res.status(400).send({ message: error.message });

    let restaurant = await restaurantModel.findOne({ adminUserName: req.body.username });
    if (!restaurant)
      return res
        .status(400)
        .send({ message: 'کاربری با این نام کاربری یا پسورد یافت نشد' });

    const result = await bcrypt.compare(req.body.password, restaurant.adminPassword);
    if (!result)
      return res
        .status(400)
        .send({ message: 'کاربری با این نام کاربری یا پسورد یافت نشد' });

    const token = restaurant.generateAuthToken();
    res.header('x-auth-token', token).status(200).send({ success: true });
    
    }
    
}
module.exports= new usersController;