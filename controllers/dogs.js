let express = require('express')
let router = express.Router()
let fs = require('fs')


router.get('/', (request, response) => {
  response.render('dogs/index');
});

router.get('/edit', (request, response) => {
  response.render('dogs/edit');
});

router.get('/new', (request, response) => {
  response.render('dogs/new');
});

router.get('/show', (request, response) => {
  response.render('dogs/show');
});

module.exports = router