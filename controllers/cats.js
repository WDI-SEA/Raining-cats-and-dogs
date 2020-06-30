const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let nameFilter = req.query.nameFilter
    if (nameFilter) {
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
    res.render('cats/edit', {cat: catData[req.params.idx], catId: req.params.idx})
})

router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.idx)

    res.render('cats/show', {myCats: catData[catIndex]})
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
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    catData[req.params.idx].name = req.body.name
    catData[req.params.idx].famousFor = req.body.famousFor
    fs.writeFileSync('./cats.json', JSON.stringify(catData))
    res.redirect('/cats')

})

module.exports = router