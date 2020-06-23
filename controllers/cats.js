let express = require('express')
let router = express.Router()
let fs = require('fs')
let methodOverride = require('method-override')

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

router.get('/new', (req,res) => {
    res.render('cats/new')
})

router.get('/edits/:index', (req,res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    res.render('cats/edit', {cat: catData[req.params.index], catId: req.params.imdex})
})

router.get('/:index',(req,res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.index)

    res.render('cats/show', {myCats: catData[catIndex]})
})

router.post('/',(req,res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    catData.push(req.body)
    fs.readFileSync('./cats.json', JSON.stringify(catData))

    res.redirect('/cats')
})

router.delete('/:index', (req,res) =>{
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    catData.splice(req.params.index,1)

    res.redirect('/cats')
})

router.put('/:index', (req,res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    cats[req.params.index].name = req.body.name
    cats[req.params.index].image = req.body.image
    cats[req.params.index].famousFor = req.body.famousFor

    fs.readFileSync('./cats.json', JSON.stringify(catData))
    res.redirect('/cats')
})

module.exports = router;