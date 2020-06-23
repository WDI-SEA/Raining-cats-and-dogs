let express = require('express');
let router = express.Router()
let fs = require('fs');

router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json');
    let catData = JSON.parse(cats);
    let nameFilter = req.query.nameFilter

    if (nameFilter) {
        catData = catData.filter(kitty => {
            return kitty.name.toLowerCase() === nameFilter.toLowerCase();
        })
    }
    res.render('cats/index', {myCat: catData})
})

// route to show famous aniamls

// route to search for specific animal

// route to get new animals

// route to edit current animals

// route to get add/post new animals

// route to delete animals

// route to update name and attributes of animals

module.exports = router;