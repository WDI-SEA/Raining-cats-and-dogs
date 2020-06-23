let express = require('express')
let router = express.Router()
let fs = require('fs')


//index route
router.get('/', (request, response) => {
  response.render('cats/index');
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
  response.redirect('/cats')
});

//route for delete
router.delete('/:index', (req, res) => {
  console.log(request.params.body)
  request.redirect('/cats')
});

//route for edits
router.put('/:index', (req, res) => {
  console.log(request.params.body)
  request.redirect('/cats')
});



module.exports = router