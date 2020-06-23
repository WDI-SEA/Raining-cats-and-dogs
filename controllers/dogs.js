let express = require('express');
let router = express.Router();
let fs = require('fs');

// get the dog data from the json file to be able to be used
router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs);
    let nameFilter = req.query.nameFilter;
    //adding functionality for the get method form we added to index.ejs
    if(nameFilter) {
        //reassing dogsData to the result of the filter
        dogData = dogData.filter(dogs => {
            //Filtering over my dogsData array and only returning values that have matched what I input in my "nameFilter"
            return dogs.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dogs/index', {myDogs: dogData})
})


router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    let dogData = JSON.parse(dogs);
    
    res.render('dogs/index', {myDogs: dogData})
})


router.get('/new', (req, res) => {
    res.render('dogs/new')
})

// What this does is allow us to get the form to update our dinosaurs.json
router.get('/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    dogs = JSON.parse(dogs);
    // the index will be a string so have to parse int into a number
    
    res.render('dogs/edit', {dog: dogs[req.params.idx], dogID: req.params.idx})
})

//chose idx which will be the index variable that will help us find that particular thing in our array
router.get('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    let dogsData = JSON.parse(dogs);
    //the index will be a string so have to parse int into a number
    let dogIndex = parseInt(req.params.idx);

    res.render('dogs/show', {myDog: dogsData[dogIndex]})
})

router.post('/', (req, res) => {
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

router.delete('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs);
    //Remove the selected dogs from our "dogs" array
    dogs.splice(req.params.idx, 1)
    // Save over our dogs.json with the newly formated dogs array
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs));
    // Once everything is done, redirect to the index page
    res.redirect('/dogs')
})

router.put('/:idx', (req, res) => {
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



module.exports = router