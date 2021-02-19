const restaurantModel=require("../../model/restaurantModel")
const userModel=require("../../model/userModel")
const {restaurantAdminLoginValidator}=require("../validator/restaurantValidator")
const {registerValidator,loginValidator}=require("../validator/userValidator")
const _=require("lodash")
const bcrypt=require("bcrypt");

class usersController{

    
    async restaurantAdminLogin(req,res){
        const { error } = restaurantAdminLoginValidator(req.body);
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
    res.header("Access-Control-Expose-headers", "x-auth-token").header('x-auth-token', token).status(200).send({ success: true });
    
    }
    async login (req,res){
      const {error}=loginValidator(req.body)
      if(error) return res.status(400).send({message:error.message})

      let user =await userModel.findOne({email:req.body.email})
      if(!user) return res.status(400).send("invalid username/password");

      const pass=await bcrypt.compare(req.body.password,user.password)
      if(!pass) return res.status(400).send("invalid username/password");

      const token=user.generateAuthToken();
      res.header("Access-Control-Expose-headers", "x-auth-token").header('x-auth-token',token).send({success:true})
      
    }
    async register (req,res){
      const {error}=registerValidator(req.body);
      if(error) return res.status(400).send({message:error.message});

      let user=await userModel.findOne({email:req.body.email});
      if(user) return res.status(400).send("that email already exist");

      user =new userModel(req.body,_.pick(["name","email","password"]))
      const salt= await bcrypt.genSalt(10);
      user.password=await bcrypt.hash(user.password,salt);
      user=await user.save()
      const token=user.generateAuthToken();
      res.header("Access-Control-Expose-headers", "x-auth-token").header('x-auth-token',token).status(200).send(user)

    }
    async updateBasket (req,res){
      const basketBody=_.pick(req.body,["restaurantId","restaurantName","foods"]);
      if(!basketBody.foods) return res.send("no foods")
      if (!basketBody.restaurantId || !basketBody.restaurantName) return res.send("need restaurant info")

      const user=await userModel.findById(req.user._id)
      if(!user) return res.send("your not login")

      user.baskt=basketBody
      await user.save()
      res.send(200)
    }
}
module.exports= new usersController;