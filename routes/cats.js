let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        catData = catData.filter(cat => {
            return cat.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('cats/index', {myCats: catData})
})

router.get('/new', (req, res) => {
    res.render('cats/new')
})

router.get('/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    res.render('cats/edit', {cat: catData[req.params.idx], catID: req.params.idx})

})

router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let catsIndex = parseInt(req.params.idx)

    res.render('cats/show', {myCats: catsData[catsIndex]})
})

router.post('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    catData.push(req.body)
    fs.writeFileSync('./cats.json', JSON.stringify(catData))
   
    res.redirect('/cats')
})

router.delete('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    catData.splice(req.params.idx, 1)

    fs.writeFileSync('./cats.json', JSON.stringify(catData))
   
    res.redirect('/cats')
})  

router.put('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    let dogData = JSON.parse(dogs)

    cats[req.params.idx].name = req.body.name
    cats[req.params.idx].image = req.body.image
    cats[req.params.idx].famousFor = req.body.famousFor

    fs.writeFileSync('./cats.json', JSON.stringify(catData))
   
    res.redirect('/cats')
})

module.exports = router