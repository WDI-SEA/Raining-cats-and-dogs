let express = require('express');
let router = express.Router();
let fs = require('fs');



//stubbing out index get route
router.get('/', (req, res) => {
    let cats = fs.readFileSync('./cats.json');
    let catsData = JSON.parse(cats);
    let nameFilter = req.query.nameFilter;
    //adding functionality to search form
    if(nameFilter) {
        //filter catsData array so that it only returns values that have matched what I input in my 'nameFilter' value in the search form
        catsData = catsData.filter(cats => {
            return cats.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
     res.render('cats/index', {myCats: catsData})
})

//stubbing out new cats creation route
router.get('/new', (req, res) => {
    res.render('cats/new')
})


//stubbing out edit route
router.get('/edit/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats);

    res.render('cats/edit', {cat: cats[req.params.idx], catID: req.params.idx})
})



//stubbing out show/details route
router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats);
    //the index will be a string so we have to turn it into a num
    let catIndex = parseInt(req.params.idx)
    
    res.render('cats/show', {myCat: catData[catIndex]})
})


//stubbing out the post/Create route - relates to new page
router.post('/', (req, res) => {
    console.log(req.body)
 
    let cats = fs.readFileSync('./cats.json')
    cats = JSON.parse(cats);
 
    cats.push(req.body);
    
    fs.writeFileSync('./cats.json', JSON.stringify(cats))
 
    res.resdirect('/cats')
})
 
//stubbing out the destroy/delete route - relates to index page with delete form
router.delete('/:idx', (req, res) => {
     let cats = fs.readFileSync('./cats.json')
     cats = JSON.parse(cats);
 
     cats.splice(req.params.idx, 1)
 
     fs.writeFileSync('./cats.json', JSON.stringify(cats));
 
     res.redirect('/cats')
 
})
 
//stubbing out the update - relates to update/edit on the edit page, link from index
router.put('/:idx', (req, res) => {
     let cats = fs.readFileSync('./cats.json')
     cats = JSON.parse(cats);
     console.log(req.body)
 
 
     cats[req.params.idx].name = req.body.name
     cats[req.params.idx].image = req.body.image
     cats[req.params.idx].famousFor = req.body.famousFor
 
     fs.writeFileSync('./cats.json', JSON.stringify(cats))
 
     res.redirect('/cats')
})

module.exports = router