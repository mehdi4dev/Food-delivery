const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function (req, res, next) {
  const role = req.user.role
  if (role==="restaurant")
    next();
    else{
     
      return res.status(401).send('شما اجازه دسترسی به این دیتا را ندارید');
    }

};
