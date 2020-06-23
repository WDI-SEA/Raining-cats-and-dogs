let express = require('express')
let router = express.Router()
let fs = require('fs')


router.get('/', (request, response) => {
  response.render('dogs/index');
});

module.exports = router