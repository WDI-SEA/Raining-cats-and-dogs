let express = require('express')
let fs = require('fs')
let router = express.Router()
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

router.use(layouts)
router.use(express.urlencoded({extended: false}))
router.use(methodOverride('_method'))

//----------/dogs ROUTES------------
router.get('/', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    console.log(dogs)
    //add a filter?
    
    res.render('dogs/index', 
        {
            dogsBio: dogs,
        }
    )
})

router.get('/new', (req, res) => {
    res.render('dogs/new')
})

router.get('/edit/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)

    res.render('dogs/edit', 
        {
            dog: dogs[req.params.idx],
            dogId: req.params.idx
        }
    )
})

router.get('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogsIndex = parseInt(req.params.idx)
    
    res.render('dogs/show', 
        {
            dogsBio: dogs[dogsIndex]
        }
    )
})

router.post('/', (req, res) => {
    console.log(req.body)
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.push(req.body)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))

    res.redirect('/dogs')
})

router.delete('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs.splice(req.params.idx, 1)
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))

    res.redirect('/dogs')
})

router.put('/:idx', (req, res) => {
    let dogs = fs.readFileSync('./dogs.json')
    dogs = JSON.parse(dogs)
    dogs[req.params.idx].name = req.body.name
    dogs[req.params.idx].knownFor = req.body.knownFor
    dogs[req.params.idx].image = req.body.image
    fs.writeFileSync('./dogs.json', JSON.stringify(dogs))

    res.redirect('/dogs')
})


module.exports = router