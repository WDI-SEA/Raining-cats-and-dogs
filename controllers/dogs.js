let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        dogData = dogData.filter(dog => {
            return dog.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dogs/index', {myDog: dogData})
})

router.get('/new', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        dogData = dogData.filter(dog => {
            return dog.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dogs/new', {myDog: dogData})
})

router.get('/edit/:index', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)

    res.render('dogs/edit', {dog: dogData[req.params.index], dogId: req.params.index})

})

router.get('/:index', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let dogIndex = parseInt(req.params.index)

    res.render('dogs/show', {myDog: dogData[dogIndex]})
})

router.post('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)

    dogData.push(req.body)

    fs.writeFileSync('./dogs.json', JSON.stringify(dogData))
   
    res.redirect('/dogs')
})

router.delete('/:index', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)

    dogData.splice(req.params.index, 1)

    fs.writeFileSync('./dogs.json', JSON.stringify(dogData))
   
    res.redirect('/dogs')
})  

router.put('/:index', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)

    dogs[req.params.index].name = req.body.name
    dogs[req.params.index].image = req.body.image
    dogs[req.params.index].famousFor = req.body.famousFor

    fs.writeFileSync('./dogs.json', JSON.stringify(dogData))
   
    res.redirect('/dogs')
})

module.exports = router