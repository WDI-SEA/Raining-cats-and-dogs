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


//stubbing out index get route
app.get('/cats', (req, res) => {
   let cats = fs.readFileSync('./cats.json');
   let catsData = JSON.parse(cats);
   

    res.render('cats/index', {myCats: catsData})
})

//stubbing out show/details route
app.get('/cats/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats);
    //the index will be a string so we have to turn it into a num
    catIndex = parseInt(req.params.idx)
    
    res.render('cats/show', {myCat: catData[catIndex]})
})

//stubbing out new route
app.get('/cats/new', (req, res) => {
    res.render('cats/new')
})

//stubbing out edit route
app.get('/cats/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats);

    res.render('cats/edit', {})
})

//stubbing out the post/Create route
app.post('/cats', (req, res) => {
   console.log(req.body)
   
})

//stubbing out the destroy/delete route
app.delete('/cats/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats);

})

//stubbing out the update
app.put('/cats/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats);

})


app.listen(8000, () => {console.log('We are in business Port 8k🤠')})
