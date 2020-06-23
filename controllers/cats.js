let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    res.render('cats/index', {cats})
})

router.post('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats.push(req.body)
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    res.redirect('/cats')
})

router.get('/add', (req, res) => {
    res.render('cats/add')
})

router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    let catIdx = parseInt(req.params.idx)
    res.render('cats/details', {cat: cats[catIdx], catId: req.params.idx})
})

router.get('/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    res.render('cats/edit', {cat: cats[req.params.idx], catId: req.params.idx})
})

router.put('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats[req.params.idx].name = req.body.name
    cats[req.params.idx].image = req.body.image
    cats[req.params.idx].famousFor = req.body.famousFor
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    res.redirect('/cats')
})

router.delete('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats.splice(req.params.idx, 1)
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    res.redirect('/cats')
})

module.exports = router