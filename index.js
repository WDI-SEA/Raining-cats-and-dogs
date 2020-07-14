let express = require('express')
let layouts = require('express-ejs-layouts')
let fs = require('fs')
let methodOverride = require('method-override')

let app = express ()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(layouts)
// Below is body-parser!
app.use(express.urlencoded({extended: false}))
// method-override will allow us to use PUT & DELETE routes!
app.use(methodOverride('_method'))
// dogs controller
app.use('/dogs', require('./controllers/dogs'))
// cats controller
app.use('/cats', require('./controllers/cats'))

// home page
app.get('/', (req, res) => {
    res.render('home')
})

// DOGS PAGE
app.get('/dogs', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let nameFilter = req.query.nameFilter

    if(nameFilter){
        dogData = dogData.filter(dino => {
            return dog.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index', {myDogs: dogData})
})

// CATS PAGE
app.get('/cats', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let nameFilter = req.query.nameFilter

    if(nameFilter){
        catData = catData.filter(cat => {
            return cat.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('cats/index', {myCat: catData})
})


// DOGS NEW
app.get('/dogs/new', (req, res) => {
    res.render('dogs/new')
})


//  CATS NEW
app.get('/cats/new', (req, res) => {
    res.render('cats/new')
})


// DOGS EDIT
app.get('/dogs/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    res.render('dogs/edit', {dog: dogs[req.params.idx], dogId: req.params.idx})
})


// DOGS INDEX
app.get('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let dogIndex = parseInt(req.params.idx)

    res.render('dogs/show', {myDog: dogData[dogIndex]})
})


// CATS EDIT
app.get('/cats/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    res.render('cats/edit', {cat: cats[req.params.idx], catId: req.params.idx})
})


// CATS INDEX
app.get('/cats/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.idx)

    res.render('cats/show', {myCat: catData[catIndex]})
})

// DOGs POST 
app.post('/dogs', (req, res) => {
    // read dogs file
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.push(req.body)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})

// CATs POST 
app.post('/cats', (req, res) => {
    // read cats file
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats.push(req.body)
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    res.redirect('/cats')
})

// DOGs DELETE
app.delete('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.splice(req.params.idx, 1)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))

    res.redirect('/dogs')    
})

// CATs DELETE
app.delete('/cats/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats.splice(req.params.idx, 1)
    fs.writeFileSync('./cats.json', JSON.stringify(cats))

    res.redirect('/cats')    
})

// DOGs PUT
app.put('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    //  select name & type of dogs
    dogs[req.params.idx].name = req.body.name
    dogs[req.params.idx].type = req.body.type
    //  rewrite the file 
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    // redirect to main page 
    res.redirect('/dogs')
})

// CATs PUT
app.put('/cats/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    //  select name & type of cats
    cats[req.params.idx].name = req.body.name
    cats[req.params.idx].type = req.body.type
    //  rewrite the file 
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    // redirect to main page 
    res.redirect('/cats')
})

app.listen(8000, () => {console.log('App has been started on port 🐸')})