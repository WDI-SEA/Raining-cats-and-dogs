let express = require('express')
let routerTwo = express.Router()
let fs = require('fs')

routerTwo.get('/', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  let dogData = JSON.parse(dogs)
  res.render('dogs/index', {myDogs: dogData})
})

routerTwo.get('/details', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  let dogData = JSON.parse(dogs)
  console.log(dogData)
  // res.render('dogs/details', {myDogs: dogData[dogIndex]})
})

routerTwo.get('/new', (req, res) => {
  res.render('dogs/new')
})

routerTwo.post('/', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  dogs.push(req.body)
  fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
  res.redirect('/dogs')
})

routerTwo.get('/edit/:idx', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  res.render('dogs/edit', {dog: dogs[req.params.idx], dogId: req.params.idx})
})

routerTwo.put('/:idx', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  dogs[req.params.idx].name = req.body.name
  dogs[req.params.idx].famousFor = req.body.famousFor
  dogs[req.params.idx].image = req.body.image
  fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
  res.redirect('/dogs')
})

routerTwo.delete('/details', (req, rex) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  dogs.splice(req.params.idx, 1)
  fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
  res.redirect('/dogs')
})




module.exports = routerTwo