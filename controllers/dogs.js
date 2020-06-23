let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  let nameFilter = req.query.nameFilter
  if (nameFilter) {
    dogs = dogs.filter(dog => {
      return dog.name.toLowerCase() === nameFilter.toLowerCase()
    })
  }
  // console.log(dogs)
  res.render('dogs/index', { dogList: dogs })
})

router.get('/new', (req,res) => {
  res.render('dogs/new')
})

router.get('/edit/:idx', (req,res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  res.render('dogs/edit', {dog: dogs[req.params.idx], dogId: req.params.idx})
})

router.get('/:idx', (req,res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  let dogIndex = parseInt(req.params.idx)
  res.render('dogs/show', {myDog: dogs[dogIndex]})
})

router.post('/', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  dogs.push(req.body)
  fs.writeFileSync('dogs.json', JSON.stringify(dogs))
  res.redirect('/dogs')
})

router.delete('/:idx', (req,res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  dogs.splice(req.params.idx, 1)
  fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
  res.redirect('/dogs')
})

router.put('/:idx', (req,res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  dogs[req.params.idx].name = req.body.name
  dogs[req.params.idx].image = req.body.image
  dogs[req.params.idx].famousFor = req.body.famousFor
  fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
  res.redirect('/dogs')
})



module.exports = router