let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/', (req, res) => {
    let doggieData = fs.readFileSync('dogs.json');
    doggieData = JSON.parse(doggieData);
    res.render('dogs/index', {doggieData});
})
router.get('/new', (req,res) => {
    res.render('dogs/new');
})
router.get('/:id', (req, res) => {
    let doggieData = fs.readFileSync('dogs.json');
    doggieData = JSON.parse(doggieData);
    let thisPup = doggieData[req.params.id];
    thisPup.id = req.params.id;
    res.render('dogs/show', {thisPup});
})
router.post('/', (req,res) => {
    let doggieData = fs.readFileSync('dogs.json');
    doggieData = JSON.parse(doggieData);
    doggieData.push({name: req.body.name, image: req.body.imgURL, famousFor: req.body.famousFor});
    fs.writeFileSync('dogs.json', JSON.stringify(doggieData));
    res.redirect('/dogs');
})
router.delete('/:id', (req, res) => {
    let doggieData = fs.readFileSync('dogs.json');
    doggieData = JSON.parse(doggieData);
    doggieData.splice(req.params.id, 1);
    fs.writeFileSync('dogs.json', JSON.stringify(doggieData));
    res.redirect('/dogs');
})

module.exports = router;