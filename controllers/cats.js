let express = require('express')
let router = express.Router()
let fs = require('fs')


router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catsData = JSON.parse(cats)
    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        catsData = catsData.filter(cats => {
            return cats.name.toLowerCase() === nameFilter.toLocaleLowerCase()
        })
    }

    res.render('cats/index', {myCats: catsData})
})


router.get('/new', (req, res) => {
    res.render('cats/new')
})


router.get('/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    res.render('cats/edit', {cats: cats[req.params.idx], catsId: req.params.idx})
})


router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catsData = JSON.parse(cats)
    let catsIndex = parseInt(req.params.idx)
    res.render('cats/show', {myCats: catsData[catsIndex]})
})


router.post('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats.push(req.body)
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


router.put('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    cats[req.params.idx].name = req.body.name
    cats[req.params.idx].image = req.body.image
    cats[req.params.idx].famousFor = req.body.famousFor
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
    res.redirect('/cats')
})


module.exports = router