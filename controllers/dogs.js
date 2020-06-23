let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
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
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    res.render('dogs/edit', {dog: dogData[req.params.idx], dogID: req.params.idx})

})
router.get('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)

    res.render('dogs/show', {myDogs: dogData[req.params.idx]})
})

router.post('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)

    dogs.push(req.body)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))

    res.redirect('/dogs')
})

module.exports = router;


module.exports = router;