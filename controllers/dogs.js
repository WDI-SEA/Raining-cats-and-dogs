const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let nameFilter = req.query.nameFilter
    if (nameFilter) {
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
    res.render('dogs/edit', {dog: dogData[req.params.idx], dogId: req.params.idx})
})

router.get('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    let dogIndex = parseInt(req.params.idx)

    res.render('dogs/show', {myDogs: dogData[dogIndex]})
})

router.post('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    dogData.push(req.body)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogData))
    res.redirect('/dogs')
})

router.delete('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    dogData.splice(req.params.idx, 1)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogData))
    res.redirect('/dogs')
})

router.put('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)
    dogData[req.params.idx].name = req.body.name
    dogData[req.params.idx].famousFor = req.body.famousFor
    fs.writeFileSync('./dogs.json', JSON.stringify(dogData))
    res.redirect('/dogs')
})

module.exports = router