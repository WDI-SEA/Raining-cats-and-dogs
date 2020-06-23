let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/', (req,res) => {
  let cats = fs.readFileSync('./cats.json')
  cats = JSON.parse(cats)

  let nameFilter = req.query.nameFilter
  if (nameFilter) {
    cats = cats.filter(cat => {
      return cat.name.toLowerCase() === nameFilter.toLowerCase()
    })
  }

  console.log(cats)
  res.render('cats/index', {catList = cats})
})



module.exports = router