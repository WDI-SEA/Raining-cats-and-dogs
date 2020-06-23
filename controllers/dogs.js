let express = require('express');
let router = express.Router();
let fs = require('fs');

//index route
router.get('/', (request, response) => {
  let data = fs.readFileSync('./dogs.json');
  data = JSON.parse(data);
  let nameFilter = request.query.nameFilter;
  if(nameFilter) {

    data = data.filter(element => {
      return element.name.toLowerCase() === nameFilter.toLowerCase();
    })
  }
  response.render('dogs/index', { data: data } );
});

//new
router.get('/new', (request, response) => {
  response.render('dogs/new');
});

//edit
router.get('/edit/:index', (request, response) => {
  console.log(request.params.index)
  response.render('dogs/edit');
});

//show route from index
router.get('/:index', (request, response) => {
  console.log(request.params.index)
  response.render('dogs/show');
});

//post form index
router.post('/', (request, response) => {
  console.log(req.body)
  response.redirect('/dogs');
});

//route for delete
router.delete('/:index', (request, response) => {
  console.log(request.params.index)
  response.redirect('/dogs');
});

//route for edits
router.put('/:index', (request, response) => {
  console.log(request.params.index)
  response.redirect('/dogs');
});



module.exports = router;