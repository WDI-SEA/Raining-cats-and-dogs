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

    res.render('cats/index', {myCat: catData})
})

router.get('/new', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        catData = catData.filter(cat => {
            return cat.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('cats/new', {myCat: catData})
})

router.get('/edit/:index', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    res.render('cats/edit', {cat: catData[req.params.index], catId: req.params.index})

})

router.get('/:index', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.index)

    res.render('cats/show', {myCat: catData[catIndex]})
})

router.post('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    catData.push(req.body)

    fs.writeFileSync('./cats.json', JSON.stringify(catData))
   
    res.redirect('/cats')
})

router.delete('/:index', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    catData.splice(req.params.index, 1)

    fs.writeFileSync('./cats.json', JSON.stringify(catData))
   
    res.redirect('/cats')
})  

router.put('/:index', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    cats[req.params.index].name = req.body.name
    cats[req.params.index].image = req.body.image
    cats[req.params.index].famousFor = req.body.famousFor

    fs.writeFileSync('./cats.json', JSON.stringify(catData))
   
    res.redirect('/cats')
})

module.exports = router