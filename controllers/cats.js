let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/', (req, res) => {
    let catData = fs.readFileSync('./cats.json');
    catData = JSON.parse(catData);
    res.render('cats/index', {catData});
})
router.get('/new', (req, res) => {
    res.render('cats/new');
})
router.get('/edit/:id', (req, res) => {
    let catData = fs.readFileSync('./cats.json');
    catData = JSON.parse(catData);
    let thisKitty = catData[req.params.id];
    thisKitty.id = req.params.id;
    res.render('cats/edit', {thisKitty});
})
router.get('/:id', (req, res) => {
    let catData = fs.readFileSync('./cats.json');
    catData = JSON.parse(catData);
    //console.log("catData", JSON.stringify(catData));
    //console.log("req.params", JSON.stringify(req.params));
    let thisKitty = catData[req.params.id];
    thisKitty.id = req.params.id;
    res.render('cats/show', {thisKitty});
})
router.post('/', (req, res) => {
    let catData = fs.readFileSync('./cats.json');
    catData = JSON.parse(catData);
    catData.push({name: req.body.name, image: req.body.imgURL, famousFor: req.body.famousFor});
    fs.writeFileSync('cats.json', JSON.stringify(catData));
    res.redirect('/cats');
})
router.delete('/:id', (req, res) => {
    let catData = fs.readFileSync('./cats.json');
    catData = JSON.parse(catData);
    catData.splice(req.params.id, 1);
    fs.writeFileSync('cats.json', JSON.stringify(catData));
    res.redirect('/cats');
})
router.put('/edit/:id', (req, res) => {
    let catData = fs.readFileSync('./cats.json');
    catData = JSON.parse(catData);
    catData[req.params.id] = {name: req.body.name, image: req.body.imgURL, famousFor: req.body.famousFor};
    fs.writeFileSync('cats.json', JSON.stringify(catData));
    res.redirect(`/cats/${req.params.id}`);
})

module.exports = router;