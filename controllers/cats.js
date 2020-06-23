let express = require('express')
let router = express.Router()
let fs = require('fs')

//GET index route to show all animals
router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json');
    let catData = JSON.parse(cats);
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        //filtering over catData array, only returning values that have matached input in "nameFilter"
        catData = catData.filter(cat => {
            return cat.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('cats/index', {myCats: catData})
})
//GET route to add new
router.get('/new', (req, res) => {
    res.render('cats/new')
})

//GET route to see details of animal
router.get('/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json');
    cats = JSON.parse(cats);
    res.render('cats/edit', {cat: cats[req.params.idx], catId: req.params.idx})
})


//POST route to create 
router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json');
    let catData = JSON.parse(cats);
    let catIndex = parseInt(req.params.idx);
    res.render('cats/show', {myCat: catData[catIndex]})
})
//route to edit 
router.post('/', (req, res) => {
    //read cat file
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    //add new content to cat array
    cats.push(req.body)
    //save new  array content to cat.json
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    //redirect to /cats
    res.redirect('/cats')
})
//route to update

//DELETE route to destroy
router.delete('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json');
    cats = JSON.parse(cats)
    //remove the selected dinos from our "dino" array
    cats.splice(req.params.idx, 1)
    //save over our dinosaur.json with the newly formatted dino array
    fs.writeFileSync('./cats.json', JSON.stringify(cats));
    //to show user the impact, redirect changes to the cats page to see all remaining dinos
    res.redirect('/cats')

})

router.put('/:idx', (req, res) => {
    //access to cats 
    let cats = fs.readFileSync('./cats.json');
    cats = JSON.parse(cats)
    //select name and type of cat selected by its ID then reassign name & type
    cats[req.params.idx].name = req.body.name;
    cats[req.params.idx].type = req.body.type;
    //rewrite the file
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    //redirect to main page
    res.redirect('/cats')
})
module.exports = router