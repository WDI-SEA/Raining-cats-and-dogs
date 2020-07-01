
let express = require('express');
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override');
var fs = require('fs');

let app = express();
// Setting our view engine, making so we can use some CSS, activating our layouts, and other fun things
app.set('view engine', 'ejs');
app.use(express.static(__dirname + 'public'))
app.use(layouts);
// Below is body-parser
app.use(express.urlencoded({extended:false}));
// Method-Override will allow us to use PUT and DELETE routes!
app.use(methodOverride('_method'));

// Created a path to the controllers
app.use('/cats', require('./controllers/cats'));
app.use('/dogs', require('./controllers/dogs'));

app.get('/', (req, res) => {
  res.render('home')
});


app.listen(3000, () => {console.log('Your listening to the smooth sounds of port 3000.')});