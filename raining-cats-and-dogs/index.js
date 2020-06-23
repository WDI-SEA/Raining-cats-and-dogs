let express = require('express')
let fs = require('fs')
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(layouts)
// Below is body-parser!
app.use(express.urlencoded({extended: false}))
// Method-Override will allow us to use PUT & DELETE routes!
app.use(methodOverride('_method'))
app.use('/dogs', require('./controllers/dogs'))
app.use('/cats', require('./controllers/cats'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/dogs/new', (req, res) => {
    res.render('dogs/new')
})

app.get('/dogs/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    res.render('dogs/edit', {dog: dogs[req.params.idx], dogId: req.params.idx})
})

app.get('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let dogIndex = parseInt(req.params.idx)

    res.render('dogs/show', {myDog: dogData[dogIndex]})
})

app.post('/dogs', (req, res) => {
    // read dogs file
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    // add the new content to the dogs array
    dogs.push(req.body)
    // save the new array content to dogs.json
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    // redirect to the /dogs
    res.redirect('/dogs')
})

app.delete('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    // Remove the selected dinosaur from our "dinosaurs" array
    dogs.splice(req.params.idx, 1)
    // Save over our dinosaurs.json with the newly formatted dinosaurs array.
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    // Once everything is done, we want to show the user the impact of their actions
    // by redirecting to the /dinosaurs route to see all remaining dinosaurs.
    res.redirect('/dogs')
})

app.put('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    // Select name & type of dinosaur selected by it's ID, then reassign name & type
    dogs[req.params.idx].name = req.body.name
    dogs[req.params.idx].type = req.body.type
    // rewrite the file
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    // redirect to main page
    res.redirect('/dogs')
})

app.listen(4000, () => {console.log('🦊Singin and Dancin on Port 4000🦊')})