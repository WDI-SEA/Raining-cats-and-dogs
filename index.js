let express = require('express')
let fs = require('fs')
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(layouts)

app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))
app.use('/dogs', require('./controllers/dogs'))
app.use('/cats', require('./controllers/cats'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let dogIndex = parseInt(req.params.idx)

    res.render('dogs/show', {myDog: dogData[dogIndex]})
})

app.post('/dogs', (req, res) => {
   
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
   
    dogs.push(req.body)
 
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
   
    res.redirect('/dogs')
})

app.delete('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    
    dogs.splice(req.params.idx, 1)
    
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    
    res.redirect('/dogs')
})

app.put('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    
    dogs[req.params.idx].name = req.body.name
    dogs[req.params.idx].type = req.body.type
    
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    
    res.redirect('/dogs')
})

app.get('/cats/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.idx)

    res.render('cats/show', {myCat: catData[catIndex]})
})

app.post('/cats', (req, res) => {
  
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
   
    cats.push(req.body)

    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    
    res.redirect('/cats')
})

app.delete('/cats/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
 
    cats.splice(req.params.idx, 1)
 
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
 
    res.redirect('/cats')
})

app.put('/cats/:idx', (req, res) => {
    let cryptids = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    
    cats[req.params.idx].name = req.body.name
    cats[req.params.idx].type = req.body.type
   
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
   
    res.redirect('/cats')
})


app.listen(3000, () => {console.log("using port 3000")})