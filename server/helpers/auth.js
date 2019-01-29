var User = require('../models');
var jwt = require('jsonwebtoken');

exports.login = (req,res)=>{
  const {password,email} = req.body
  User.findOne({email}).then(user=>{
    user.comparePassword(password,(err,isMatch)=>{
      if(isMatch){
        var token = jwt.sign({userId: user._id},process.env.SECRET);
        res.status(200).json({
          name:`${user.firstName} ${user.lastName}`,
          username:user.username,
          timezoneOffset:user.timezoneOffset,
          email,
          token
        })
      }
      else{
        res.status(400).json({message:'Invalid password!'})
      }
    }).catch(err=>{
      res.status(400).json({message:'Email not found!'})
    })
  })
}
exports.register = (req,res)=>{
  User.create({
    ...req.body,
    firstName:req.body.firstName.toLowerCase(),
    lastName:req.body.lastName.toLowerCase()
  }).then(user=>{
    var token = jwt.sign({userId: user._id},process.env.SECRET);
    res.status(202).json({
      name:`${user.firstName} ${user.lastName}`,
      username:user.username,
      timezoneOffset:user.timezoneOffset,
      email:user.email,
      token
    });
  }).catch(err=>{
    res.status(400).json(err);
  })
}
