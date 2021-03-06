const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validateCreateRestaurant = (data) => {
  const schema = Joi.object({
    description: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string(),
    adminUserName: Joi.string().required(),
    adminPassword: Joi.string().required(),

  });
  return schema.validate(data);
};
const validateUpdateRestaurant = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    address: Joi.string(),
    adminUserName: Joi.string(),
    adminPassword: Joi.string(),

  });
  return schema.validate(data);
};
const restaurantAdminLoginValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};
const foodValidator=(data)=>{
  const schema=Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required()
  })
  return schema.validate(data)
}
const commentValidator=(data)=>{
  const schema=Joi.object({
    user:Joi.string().required(),
    text:Joi.string().required(),
    score:Joi.number().required()
    
  })
  return schema.validate(data)
}
module.exports = { validateCreateRestaurant,validateUpdateRestaurant,restaurantAdminLoginValidator,foodValidator,commentValidator };
