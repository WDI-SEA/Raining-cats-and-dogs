let express = require('express');
let router = express.Router()
let fs = require('fs');

// route to show famous aniamls
router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json');
    let catData = JSON.parse(cats);
    let nameFilter = req.query.nameFilter
    // route to search for specific animal
    if (nameFilter) {
        catData = catData.filter(kitty => {
            return kitty.name.toLowerCase() === nameFilter.toLowerCase();
        })
    }
    res.render('cats/index', {myCat: catData})
})

// route to get new animals
router.get('/new', (req, res) => {
    res.render('cats/new')
})

// route to edit current animals
router.get('/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    res.render('cats/edit', {myCat: catData[req.params.idx], catId: req.params.idx})
})

router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.idx);

    res.render('cats/show', {myCat: catData[catIndex]})
})

// route to get add/post new animals
router.post('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats.push(req.body)
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    res.redirect('/cats')
})

// route to delete animals
router.delete('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats.splice(req.params.idx, 1)
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    res.redirect('/cats')
})

// route to update name and attributes of animals
router.put('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json');
    cats = JSON.parse(cats);
    cats[req.params.idx].name = req.body.name;
    cats[req.params.idx].famousFor = req.body.famousFor;

    fs.writeFileSync('./cats.json', JSON.stringify(cats))

    res.redirect('/cats')
})

module.exports = router;