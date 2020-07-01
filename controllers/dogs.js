// Set our requires 
let express = require('express');
let router = express.Router();
let fs = require('fs');

// Create GET route to index
router.get('/', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  let dogData = JSON.parse(dogs);
  let nameFilter = req.query.nameFilter;
  // Add filter 
  if(nameFilter) {
    dogData = dogData.filter(dogs => {
      return dogs.name.toLowerCase() === nameFilter.toLowerCase()
    })
  }
  res.render('dogs/index', {myDogs: dogData})
})

// Create GET route for adding a new dog
router.get('/new', (req, res) => {
  res.render('dogs/new')
})

// CREATE GET route to edit a dog
router.get('/edit/:idx', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json');
  dogs = JSON.parse(dogs);
  res.render('dogs/edit', {dog: dogs[req.params.idx], dogID: req.params.idx})
})

// Create GET route to show/details
router.get('/:idx', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json');
  let dogsData = JSON.parse(dogs);
  // Index will be a string so have to parse int into a number
  let dogIndex = parseInt(req.params.idx);
  res.render('dogs/show', {myDog: dogsData[dogIndex]})
})

// Create POST(create) route for dogs
router.post('/', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs)
  dogs.push(req.body)
  fs.writeFileSync('./dogs.json', JSON.stringify(dogs))
  res.redirect('/dogs')
})

// Create delete route 
router.delete('/:idx', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json')
  dogs = JSON.parse(dogs);
  dogs.splice(req.params.idx, 1)
  fs.writeFileSync('./dogs.json', JSON.stringify(dogs));
  res.redirect('/dogs')
})

// Create UPDATE route 
router.put('/:idx', (req, res) => {
  let dogs = fs.readFileSync('./dogs.json');
  dogs = JSON.parse(dogs);
  dogs[req.params.idx].name = req.body.name;
  dogs[req.params.idx].image = req.body.image;
  dogs[req.params.idx].famousFor = req.body.famousFor;
  fs.writeFileSync('./dogs.json', JSON.stringify(dogs));
  res.redirect('/dogs')
})



module.exports = router 