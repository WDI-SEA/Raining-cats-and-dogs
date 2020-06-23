let express = require('express')
let router = express.Router()
let fs = require('fs');
const { captureRejectionSymbol } = require('events');
const { request } = require('http');

//index route
router.get('/', (request, response) => {
  response.render('dogs/index');
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
  response.redirect('/dogs')
});

//route for delete
router.delete('/:index', (req, res) => {
  console.log(request.params.body)
  request.redirect('/dogs')
});

//route for edits
router.put('/:index', (req, res) => {
  console.log(request.params.body)
  request.redirect('/dogs')
});


module.exports = router