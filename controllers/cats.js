let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    res.render('cats/index', {myCats: catData})
})

router.get('/new', (req, res) => {
    res.render('cats/new')
})

router.get('/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    res.render('cats/edit', {cat: cats[req.params.idx], catId: req.params.idx})
})

router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.idx)

    res.render('cats/show', {myCat: catData[catIndex]})
})

router.post('/', (req, res) => {
    // read cats file
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    // add the new content to the cats array
    cats.push(req.body)
    // save the new array content to cats.json
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    // redirect to the /cats
    res.redirect('/cats')
})

router.delete('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    // Remove the selected cat from our "cats" array
    cats.splice(req.params.idx, 1)
    // Save over our cats.json with the newly formatted cats array.
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    // Once everything is done, we want to show the user the impact of their actions
    // by redirecting to the /cats route to see all remaining cats.
    res.redirect('/cats')
})

router.put('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    // Select name & type of cat selected by it's ID, then reassign name & type
    cats[req.params.idx].name = req.body.name
    cats[req.params.idx].image = req.body.image
    cats[req.params.idx].famousFor = req.body.famousFor
    // rewrite the file
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    // redirect to main page
    res.redirect('/cats')
})


module.exports = router