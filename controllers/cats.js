let express = require('express')
let router = express.Router()
let fs = require('fs')


router.get('/', (request, response) => {
  response.render('cats/index');
});

router.get('/edit', (request, response) => {
  response.render('cats/edit');
});

router.get('/new', (request, response) => {
  response.render('cats/new');
});

router.get('/show', (request, response) => {
  response.render('cats/show');
});



module.exports = router