let express = require('express');
let layouts = require('express-ejs-layouts');
//fs allows us to use our file structure
let fs = require('fs')
//require method override
let methodOverride = require('method-override')


let app = express();

//adding css to the server side so it can be linked into my layout
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(layouts);
//body parser
app.use(express.urlencoded({extended: false}))
//Method-oVerride will also us to use PUT & DELETE route
app.use(methodOverride('_method'));
//adding the router route
app.use('/dogs', require('./controllers/dogs'))

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(8000, () => {console.log('We are in business Port 8k🤠')})
