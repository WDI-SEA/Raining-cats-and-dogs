let express = require('express')
let router = express.Router()
let fs = require('fs')


router.get('/', (request, response) => {
  response.render('cats/index');
});

module.exports = router