let express = require('express');
let router = express.Router();
let fs = require('fs');

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

    res.render('cats/show', {myCat: catData[req.params.idx]})
})

router.post('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)

    cats.push(req.body)
    fs.writeFileSync('./cats.json', JSON.stringify(cats))

    res.redirect('/cats')
})

module.exports = router;








// //get route/cats to show list of cat names also clickable
// router.get('/', (req, res) => {
//     let cats = fs.readFileSync('./cats.json');
//     let catData = JSON.parse(cats);

//     res.render('cats/index', {myCats: catData})

// });

// router.get('/:id', (req, res) => {
//     let cats = fs.readFileSync('./cats.json');
//     let catData = JSON.parse(cats);

//     res.render('cats/show', {myCat: catData[req.params.id]})
// })