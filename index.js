let express = require('express')
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')
let fs = require('fs')
let router = express.Router();

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(layouts)
// Below is body-parser
app.use(express.urlencoded({ extended: false }))
// Method-Override will alow us to use PUt & DELETE Routes
// app.use('/cats', require('./controllers/cats'))
// app.use('/dogs', require('./controllers/dogs'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cats', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    catData = JSON.parse(cats)
    let nameFilter = req.query.nameFilter

    if (nameFilter) {
        // Filter over dinoData array, return values in lowercase since case sensitive checking the nameFilter to dino array
        catData = catData.filter(cat => {
            return cat.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('cats/index', {myCats: catData})
})

app.get('/cats/new', (req,res) => {
    res.render('cats/new')
})

app.get('/cats/edit:/index', (req,res) => {
    let cats = fs.readFileSync('./cats.json')
    catData = JSON.parse(cats)

    res.render('cats/edit', {cat: cats[req.params.index], catId: req.params.index})
})

app.get('/cats/:index', (req,res) => {
    let cats = fs.readFileSync('./cats.json')
    catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.index)

    res.render('cats/show', {myCats: catData[catIndex]})
})

app.listen(8000);