require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const landingRoute = require('./routes');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 3000

const app = express();

//Setup body-parser so that form posts will be inside req.body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//setup public directory
app.use(express.static('public'));

//This is where the main routing logic will go.
app.use('/api',landingRoute);
app.use('/api',authRoutes);

//If a response still hasnt been sent, default to sending an error message
app.use((req,res)=>{
  let err = new Error("Whoops. Something went wrong!");
  err.status = 404;
  res.status(err.status).json({
    errorMessage:err.message
  })
});


app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
})

module.exports = app; //for mocha tests.
