let express = require('express');
let router = express.Router()
let fs = require('fs'); 

// route to show famous aniamls

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    let dogData = JSON.parse(dogs);
    let nameFilter = req.query.nameFilter
    // route to search for specific animal
        if(nameFilter) {
            dogData = dogData.filter(doggo => {
                return doggo.name.toLowerCase() === nameFilter.toLowerCase();
            })
        }
        res.render('dogs/index', {myDog: dogData});
})

// route to get new animals
router.get('/new', (req, res) => {
    res.render('dogs/new')
})

// route to edit current animals
router.get('/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    res.render('dogs/edit', {myDog: dogData[req.params.idx], dogId: req.params.idx})
})

router.get('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let dogIndex = parseInt(req.params.idx);

    res.render('dogs/show', {myDog: dogData[dogIndex]})
})

// route to get show new animals
router.post('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.push(req.body)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})
// route to delete animals
router.delete('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.splice(req.params.idx, 1)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})

// route to update name and attributes of animals
router.put('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    dogs = JSON.parse(dogs);
    dogs[req.params.idx].name = req.body.name;
    dogs[req.params.idx].famousFor = req.body.famousFor;
    dogs[req.params.idx].image = req.body.image;

    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))

    res.redirect('/dogs')
})
module.exports = router;