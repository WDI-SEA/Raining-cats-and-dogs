let express = require('express');
let router = express.Router()
let fs = require('fs');

// route to show famous aniamls

router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json');
    let dogData = JSON.parse(dogs);
    let nameFilter = req.query.nameFilter
    // route to search for specific animal
        if(nameFilter) {
            dogData = dogData.filter(doggo => {
                return doggo.name.toLowerCase() === nameFilter.toLowerCase();
            })
        }
        res.render('dogs/index', {myDog: dogData});
})




// route to get new animals

// route to edit current animals

// route to get add/post new animals

// route to delete animals

// route to update name and attributes of animals

module.exports = router;