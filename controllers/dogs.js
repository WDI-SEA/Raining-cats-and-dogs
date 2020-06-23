var express = require('express')
var router = express.Router()
var fs = require('fs')

router.get('/', (req,res) => {
    var dogs = fs.readFileSync('./dogs.json')
    var dogsData = JSON.parse(dogs)
    var nameFilter = req.query.nameFilter
    if(nameFilter) {
        dogsData = dogsData.filter(dogsInfo => {
            return dogsInfo.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dogs/index', {myDogs: dogsData})
})

router.get('/new', (req,res) => {
    res.render('dogs/new')
})

router.get('/edit/:index', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    res.render('/dogs/edit',{dogs: dogs[req.params.index], dogsId: req.params.index})
})

router.get('/:index', (req,res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogsData = JSON.parse(dogs)
    let dogsIndex = parseInt(req.params.index)

    res.render(('dogs/show'), {myDogs: dogsData[dogsIndex]})
})

router.post('/', (req, res) => {
    var dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.push(req.body)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.redirect('/dogs')
})

router.delete('/:index', (req,res) => {
    var dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.splice(req.params.index, 1)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    res.render('/dogs')
})

router.put('/:index', (req,res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs[req.params.index].name = req.body.name
    dogs[req.params.index].type = req.body.type
    dogs[req.params.index].famousFor = req.body.famousFor
    //rewrite
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
    //redirect
    res.redirect('/dogs')
})

module.exports = router