let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    letDogData = JSON.parse(dogs)
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

router.get('/idx', (req, res) => {
    let dogs = fs.readFileSync('.dogs.json')
    let dogData = JSON.parse(dogs)
    let dogIndex = parseInt(req.params.idx)
    res.render('dogs/show', {mydog: dogData[dogIndex]})
})

module.exports = router