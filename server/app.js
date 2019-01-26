require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000

const app = express();

//Setup body-parser so that form posts will be inside req.body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//setup public directory
app.use(express.static('public'));

//this is where the main routing logic will go.
app.use('/',require('./routes'))

app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
})
