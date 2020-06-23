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
// app.use('/dinosaurs', require('./controllers/dinosaurs'))

app.get('/', (req, res) => {
    res.render('home')
})

//UMMMMMMMMM 
// get the dog data from the json file to be able to be used
app.get('/dogs', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs);
    let nameFilter = req.query.nameFilter;
    //adding functionality for the get method form we added to index.ejs
    if(nameFilter) {
        //reassing dogsData to the result of the filter
        dogsData = dogsData.filter(dogs => {
            //Filtering over my dogsData array and only returning values that have matched what I input in my "nameFilter"
            return dogs.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dogs/index', {myDogs: dogData})
})


app.get('/dogs', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    let dogData = JSON.parse(dogs);
    
    res.render('dogs/index', {myDogs: dogData})
})


app.get('/dogs/new', (req, res) => {
    res.render('dogs/new')
})

// What this does is allow us to get the form to update our dinosaurs.json
app.get('/dogs/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    let dogsData = JSON.parse(dogs);
    // the index will be a string so have to parse int into a number
    
    res.render('/dogs/edit', {dog: dogsData[req.params.idx], dogID: req.params.idx})
})

//chose idx which will be the index variable that will help us find that particular thing in our array
app.get('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    let dogData = JSON.parse(dogs);
    //the index will be a string so have to parse int into a number
    let dogIndex = parseInt(req.params.idx);

    res.render('dogs/show', {dog: dogData[dogIndex]})
})

app.post('/dogs', (req, res) => {
    // console.log(req.body) the body is everything submitted in the form
    //read dogs file
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    //add the new content -the data from from body - to the dogs array, 
    dogs.push(req.body)
    // save the new array content to dogs.json - need to write file sync
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    //on submit, redirect to the /dogs index page which has a list of dogs
    res.redirect('/dogs')
})

app.delete('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs);
    //Remove the selected dogs from our "dogs" array
    dogs.splice(req.params.idx, 1)
    // Save over our dogs.json with the newly formated dogs array
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs));
    // Once everything is done, redirect to the index page
    res.redirect('/dogs')
})

app.put('/dogs/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    // Select name & type of dinosaur selected by it's ID, then reassign name & type
    dogs[req.params.idx].name = req.body.name
    dogs[req.params.idx].image = req.body.image
    dogs[req.params.idx].famousFor = req.body.famousFor
    // rewrite the file
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    // redirect to main page
    res.redirect('/dogs')
})

app.listen(8000, () => {console.log('We are in business Port 8k🤠')})
