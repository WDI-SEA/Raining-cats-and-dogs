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

    res.render('cats/index', {mycats: catData})
})

router.get('/new', (req, res) => {
    res.render('cats/new')
})

router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('.cats.json')
    let catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.idx)
    res.render('cats/show', {mycat: cat[catIndex]})
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

    // check to see if .type applies
    cats[req.params.idx].img_url = req.body.img_url

    cats[req.params.idx].name = req.body.name
    cats[req.params.idx].famousFor = req.body.famousFor

    fs.writeFileSync('./cats.json', JSON.stringify(cats))

    res.redirect('/cats')
})

router.get('/edit/:idx', (req,res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats)
    res.render('cats/edit', {mycats: cats[req.params.idx], catId: req.params.idx})
})

module.exports = router