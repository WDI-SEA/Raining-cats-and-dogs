let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats);
    // console.log(dinoData);
    let nameFilter = req.query.nameFilter

    if(nameFilter) {
        // filtering over dinoData array, only returning values that have matched what I 
        // input in my "nameFilter"
        catData = catData.filter( cat => {
            return cat.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('cats/index', {myCat: catData})
})

router.get('/new', (req, res) => {
    res.render('cats/new');
})

router.get('/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats);
    res.render('cats/edit', {cat: catData[req.params.idx], catId: req.params.idx})
})

router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats);
    let catIndex = parseInt(req.params.idx)

    res.render('cats/show', {myCat: catData[catIndex]})
})

router.post('/', (req, res) => {
    // read dinosaurs file 
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats);
    // add the new content to the dinosaurs array
    catData.push(req.body)
    // save new array content to dinosaurs.JSON
    fs.writeFileSync('./cats.JSON', JSON.stringify(catData))
    // redirect to the /dinosaurs index list
    res.redirect('/cats')

})

router.delete('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats);
    // going to delete the dino that we point at - only want to delete one at a time 
    // remove the selected dino from the dinosaurs array
    catData.splice(req.params.idx, 1)
    // save over our dinosaurs.json with the newly formatted dinosaurs 
    fs.writeFileSync('./cats.json', JSON.stringify(catData))
    // once everything is done, we want to show the user the impace of their actions
    // by redirecting to the list of dinosaurs 
    res.redirect('/cats')
})

router.put('/:idx', (req, res) => {
    // access to the faux database
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats);
    // select name & type of dino selected by it's ID, then reassign name & type
    cats[req.params.idx].name = req.body.name
    cats[req.params.idx].famous = req.body.famous
    cats[req.params.idx].image = req.body.image
    // rewrite the file 
    fs.writeFileSync('./cats.json', JSON.stringify(catData))
    // redirect to the main page 
    res.redirect('/cats')
})

module.exports = router