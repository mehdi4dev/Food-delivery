const Joi=require("joi");

function registerValidator(data) {
    const schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required()
    })
    return schema.validate(data);
}
function  loginValidator(data) {
    const schema=Joi.object({
        email:Joi.string().required(),
        password:Joi.string().required()
    })
    return schema.validate(data);
}
module.exports ={registerValidator,loginValidator}