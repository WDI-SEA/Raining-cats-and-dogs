// Set our requires for express, router, and fs
let express = require('express');
let router = express.Router();
let fs = require('fs');

// Create GET route to index
router.get('/', (req, res) => {
  let cats = fs.readFileSync('./cat.json');
  let catsData = JSON.parse(cats);
  let nameFilter= req.query.nameFilter;
  // Add filter to form
  if(nameFilter) {
    catsData = catsData.filter(cats => {
      return cats.name.toLowerCase() === nameFilter.toLowerCase
    })
  }
  res.render('cats/index', {myCats: catsData})
})

// Create GET route for adding a new cat
router.get('/new', (req, res) => {
  res.render('cats/new')
})

// Create GET route to edit
router.get('/edit/:idx', (req, res) => {
  let cats = fs.readFileSync('./cats,json')
  cats = JSON.parse(cats);

  res.render('cats/edit', {cats: cats[req.params.idx], catId: req.params.idx});
})
// Create GET route for show/details
router.get('/:idx', (req, res) => {
  let cats = fs.readFileSync('./cats.json');
  let catData = JSON.parse(cats);
  let catIndex = parseInt(req.params.idx);

  res.render('cats/show', {myCat: catData[catIndex]});
})

// Create POST(Create) route for cats
router.post('/', (req,res) => {
  let cats = fs.readFileSync('./cats.json')
  cats = JSON.parse(cats);

  cats.push(req.body);

  fs.writeFileSync('./cats.json', JSON.stringify(cats));

  res.resdirect('/cats');
})

// Create DELETE route 
router.delete('/:idx', (req, res) => {
  let cats = fs.readFileSync('./cats.json');
  cats = JSON.parse(cats);

  cats.splice(req.params.idx, 1);

  fs.writeFileSync('./cats.json', JSON.stringify(cats));

  res.redirect('/cats'); 
})

// Create UPDATE route
router.put('/:idx', (req, res) => {
  let cats = fs.readFileSync('./cats.json');
  cats = JSON.parse(cats);

  cats[req.params.idx].name = req.body.name;
  cats[req.params.idx].image = req.body.image;
  cats[req.params.idx].famousFor = req.body.famousFor;

  fs.writeFileSync('./cats.json', JSON.stringify(cats))

  res.redirect('/cats');
})

module.exports = router;