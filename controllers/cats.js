var express = require('express')
var router = express.Router()
var fs = require('fs')

router.get('/', (req,res) => {
    var cats = fs.readFileSync('./cats.json')
    var catsData = JSON.parse(cats)
    var nameFilter = req.query.nameFilter

    if(nameFilter) {

        catsData = catsData.filter(catsInfo => {
            return catsInfo.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('cats/index', {myCats: catsData})
})

router.get('/new', (req,res) => {
    res.render('cats/new')
})

router.get('/edit/:index', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    res.render('/cats/edit',{cats: cats[req.params.index], catsId: req.params.index})
})

router.get('/:index', (req,res) => {
    let cats = fs.readFileSync('./cats.json')
    let catsData = JSON.parse(cats)
    let catsIndex = parseInt(req.params.index)

    res.render(('cats/show'), {myCats: catsData[catsIndex]})
})

router.post('/', (req, res) => {
    var cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats.push(req.body)
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    res.redirect('/cats')
})

router.delete('/:index', (req,res) => {
    var cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats.splice(req.params.index, 1)
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    res.render('/cats')
})

router.put('/:index', (req,res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(dino)
    cats[req.params.index].name = req.body.name
    cats[req.params.index].type = req.body.type
    //rewrite
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    //redirect
    res.redirect('/cats')
})

module.exports = router