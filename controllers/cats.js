let express = require('express');
let router = express.Router();
let fs = require('fs');


//index route
router.get('/', (request, response) => {
  let data = fs.readFileSync('./cats.json');
  data = JSON.parse(data);
  let nameFilter = request.query.nameFilter;
  if(nameFilter) {

    data = data.filter(element => {
      return element.name.toLowerCase() === nameFilter.toLowerCase();
    })
  }
  response.render('cats/index', { data: data } );
});

//new
router.get('/new', (request, response) => {
  response.render('cats/new');
});

//edit
router.get('/edit/:index', (request, response) => {
  console.log(request.params.index)
  response.render('cats/edit');
});

//show route from index
router.get('/:index', (request, response) => {
  console.log(request.params.index)
  response.render('cats/show');
});

//post form index
router.post('/', (request, response) => {
  console.log(req.body)
  response.redirect('/cats');
});

//route for delete
router.delete('/:index', (request, response) => {
  console.log(request.params.index)
  response.redirect('/cats');
});

//route for edits
router.put('/:index', (request, response) => {
  console.log(request.params.index)
  response.redirect('/cats');
});



module.exports = router;