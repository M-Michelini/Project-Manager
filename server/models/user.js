const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const nameValidator = name=>/^[a-z]{2,12}$/.test(name);
const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  timezoneOffset: {
    type: Number,
    default:0
  }
});

userSchema.path('firstName').validate(nameValidator,'firstName must be all lowercase letters and length in range(2,12) inclusive')

userSchema.pre("save", async function(next) {
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash
  next()
});

userSchema.methods.comparePassword = function(testPassword, next) {
  bcrypt.compare(testPassword, this.password).then(isMatch=>{
    next(null,isMatch);
  }).catch(err=>next(err))
};

const User = mongoose.model("User", userSchema);

module.exports = User;
