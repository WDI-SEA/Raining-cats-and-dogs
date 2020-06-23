let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs);
    // console.log(dinoData);
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        // filtering over dog array, only returning values that have matched what I 
        // input in my "nameFilter"
        dogData = dogData.filter( dog => {
            return dog.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dogs/index', {myDog: dogData})
})

router.get('/new', (req, res) => {
    res.render('dogs/new');
})

router.get('/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs);
    res.render('dogs/edit', {dog: dogData[req.params.idx], dogId: req.params.idx})
})

router.get('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs);
    let dogIndex = parseInt(req.params.idx)

    res.render('dogs/show', {myDog: dogData[dogIndex]})
})

router.post('/', (req, res) => {
    // read dinosaurs file 
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs);
    // add the new content to the dinosaurs array
    dogData.push(req.body)
    // save new array content to dinosaurs.JSON
    fs.writeFileSync('./dogs.JSON', JSON.stringify(dogData))
    // redirect to the /dinosaurs index list
    res.redirect('/dogs')

})

router.delete('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs);
    // going to delete the dino that we point at - only want to delete one at a time 
    // remove the selected dino from the dinosaurs array
    dogData.splice(req.params.idx, 1)
    // save over our dinosaurs.json with the newly formatted dinosaurs 
    fs.writeFileSync('./dogs.json', JSON.stringify(dogData))
    // once everything is done, we want to show the user the impace of their actions
    // by redirecting to the list of dinosaurs 
    res.redirect('/dogs')
})

router.put('/:idx', (req, res) => {
    // access to the faux database
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs);
    // select name & type of dino selected by it's ID, then reassign name & type
    dogs[req.params.idx].name = req.body.name
    dogs[req.params.idx].famous = req.body.famous
    dogs[req.params.idx].image = req.body.image
    // rewrite the file 
    fs.writeFileSync('./dogs.json', JSON.stringify(dogData))
    // redirect to the main page 
    res.redirect('/dogs')
})

module.exports = router