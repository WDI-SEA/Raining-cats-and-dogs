let express = require('express');
let layouts = require('express-ejs-layouts');
let methodOverride = require('method-override');
let fs = require('fs');

let app = express();

app.set('view engine', 'ejs');
// CSS folder and possibly static JS page for homepage 
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'))
// body parser 
app.use(express.urlencoded({extended: false}));
// method override will allow me to use PUT & DELETE 
// calls on the stored functions in the controllers foldr 
app.use('/dogs', require('./controllers/dogs'));
app.use('/cats', require('./controllers/cats'));


// starting to interact with our app 
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log("Welcome to the year 3000")
})