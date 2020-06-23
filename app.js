let express = require('express');

let layouts = require('express-ejs-layouts')

let methodOverride = require('method-override');

let app = express();

let port = 3000;

app.set('view engine', 'ejs');


//use public stylesheet
app.use(express.static(__dirname + '/public'));

app.use(layouts);
//body parser
app.use(express.urlencoded( { extended: false } ));
//extra methods
app.use(methodOverride('_method'));
//controllers
app.use('/cats', require('./controllers/cats'));
app.use('/dogs', require('./controllers/dogs'));


app.get('/', (request, response) => {
  console.log('home')
  response.render('home')
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
