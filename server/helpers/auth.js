var User = require('../models');
var jwt = require('jsonwebtoken');

//ROUTES
exports.login = (req,res)=>{
  const {password,email} = req.body
  User.findOne({email}).then(user=>{
    user.comparePassword(password,(err,isMatch)=>{
      if(isMatch){
        var token = jwt.sign({userId: user._id},process.env.SECRET);
        res.status(200).json({
          _id:user._id,
          name:`${user.firstName} ${user.lastName}`,
          username:user.username,
          timezoneOffset:user.timezoneOffset,
          email,
          token
        })
      }
      else{
        res.status(404).json({message:'Invalid password!'})
      }
    })
  }).catch(err=>{
    res.status(404).json({message:'Email not found!'})
  })
}
exports.register = (req,res)=>{
  User.create({
    ...req.body,
    firstName:req.body.firstName ? req.body.firstName.toLowerCase() : '',
    lastName:req.body.lastName ? req.body.lastName.toLowerCase() : ''
  }).then(user=>{
    var token = jwt.sign({userId: user._id},process.env.SECRET);
    res.status(202).json({
      _id:user._id,
      name:`${user.firstName} ${user.lastName}`,
      username:user.username,
      timezoneOffset:user.timezoneOffset,
      email:user.email,
      token
    });
  }).catch(err=>{
    if(err.code===11000){
      let duplicatedPath = err.errmsg.match(/\$.+_/g)[0]
      duplicatedPath = duplicatedPath.slice(1,duplicatedPath.length-1);
      res.status(400).json({
        duplicatedPath,
        message:`The given ${duplicatedPath} is taken. Please try again with a different ${duplicatedPath}.`
      });
    }else if(err.hasOwnProperty('errors')){
      res.status(400).json(Object.keys(err.errors).map(key=>({
        path:err.errors[key].path,
        message:err.errors[key].message
      })))
    }else{
      console.log(err)
      res.status(400).json(err);
    }
  })
}
exports.deleteUser = (req,res,next)=>{
  User.deleteOne({
    _id:req.params._id
  }).then(mongoResponse=>{
    if(mongoResponse.n === 1){
      res.status(202).json({
        message:"Successfully deleted user."
      });
    }else{
      next();
    }
  }).catch(err=>{
    res.status(404).json(err);
  })
}

//MIDDLEWARE
exports.ensureCorrectUser = function(req, res,next) {
  try {
    var token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if(decoded && decoded.userId === req.params._id){
        next();
      } else {
        res.status(401).json({message: 'Unauthorized'})
      }
    });
  } catch(e){
    res.status(401).json({message: 'Unauthorized'})
  }
}
