let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    res.render('dogs/index', {dogs})
})

router.post('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    if (!req.body.image) {
        req.body.image = 'https://i.ytimg.com/vi/HSUQDPcm2Pc/maxresdefault.jpg'
    }
    dogs.push(req.body)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})

router.get('/add', (req, res) => {
    res.render('dogs/add')
})

router.get('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    let dogIdx = parseInt(req.params.idx)
    res.render('dogs/details', {dog: dogs[dogIdx], dogId: req.params.idx})
})

router.get('/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    res.render('dogs/edit', {dog: dogs[req.params.idx], dogId: req.params.idx})
})

router.put('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs[req.params.idx].name = req.body.name
    dogs[req.params.idx].image = req.body.image
    dogs[req.params.idx].famousFor = req.body.famousFor
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})

router.delete('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.splice(req.params.idx, 1)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})

module.exports = router