let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    let dogData = JSON.parse(dogs);
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        //filtering over dogData array, only returning values that have matached input in "nameFitler"
        dogData = dogData.filter(dog => {
            return dog.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dogs/index', {myDogs: dogData})
})

router.get('/new', (req, res) => {
    res.render('dogs/new')
})

router.get('/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    dogs = JSON.parse(dogs)
    res.render('dogs/edit', {dog: dogs[req.params.idx], dogId: req.params.idx})
})

router.get('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    let dogData = JSON.parse(dogs);
    let dogIndex = parseInt(req.params.idx);
    res.render('dogs/show', {myDog: dogData[dogIndex]})
})

router.post('/', (req, res) => {
    //read dog file
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    //add new content to dog array
    dogs.push(req.body)
    //save new  array content to dog.json
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    //redirect to /dogs
    res.redirect('/dogs')
})

router.delete('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    dogs = JSON.parse(dogs)
    //remove the selected dogs from our "dog" array
    dogs.splice(req.params.idx, 1)
    //save over our dogsaur.json with the newly formatted dog array
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs));
    //to show user the impact, redirect changes to the dogs page to see all remaining dogs
    res.redirect('/dogs')

})

router.put('/:idx', (req, res) => {
    //access to dogs 
    let dogs = fs.readFileSync('./dogs.json');
    dogs = JSON.parse(dogs)
    //select name and type of dog selected by its ID then reassing name &type
    dogs[req.params.idx].name = req.body.name;
    dogs[req.params.idx].type = req.body.type;
    //rewrite the file
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    //redirect to main page
    res.redirect('/dogs')
})
module.exports = router

