var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,{
  reconnectTries: Number.MAX_VALUE,
  useCreateIndex: true,
  useNewUrlParser: true,
  keepAlive:true
});

module.exports = require('./user');
