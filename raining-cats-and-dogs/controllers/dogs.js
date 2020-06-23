let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let nameFilter = req.query.nameFilter
    

    if(nameFilter){
        // Filtering over my dinoData array, only returning values that have matched what I
        // input in my "nameFilter"
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
    dogs = JSON.parse(dogs)
    res.render('dogs/edit', {dog: dogs[req.params.idx], dogId: req.params.idx})
})



module.exports = router






