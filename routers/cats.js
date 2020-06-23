let express = require('express')
let routerOne = express.Router()
let fs = require('fs')

routerOne.get('/', (req, res) => {
  let cats = fs.readFileSync('./cats.json')
  let catData = JSON.parse(cats)
  res.render('cats/index', {myCats: catData})
})

routerOne.get('/details/:idx', (req, res) => {
  let cats = fs.readFileSync('./cats.json')
  let catData = JSON.parse(cats)
  let catIndex = parseInt(req.params.idx)
  res.render('cats/details', {myCats: catData[catIndex]})
})

routerOne.get('/new', (req, res) => {
  res.render('cats/new')
})

routerOne.post('/', (req, res) => {
  let cats = fs.readFileSync('./cats.json')
  cats = JSON.parse(cats)
  cats.push(req.body)
  fs.writeFileSync('./cats.json', JSON.stringify(cats))
  res.redirect('/cats')
})

routerOne.get('/edit/:idx', (req, res) => {
  let cats = fs.readFileSync('./cats.json')
  cats = JSON.parse(cats)
  res.render('cats/edit', {cat: cats[req.params.idx], catId: req.params.idx})
})

routerOne.put('/:idx', (req, res) => {
  let cats = fs.readFileSync('./cats.json')
  cats = JSON.parse(cats)
  cats[req.params.idx].name = req.body.name
  cats[req.params.idx].famousFor = req.body.famousFor
  cats[req.params.idx].image = req.body.image
  fs.writeFileSync('./cats.json', JSON.stringify(cats))
  res.redirect('/cats')
})

routerOne.delete('/details/:idx', (req, rex) => {
  let cats = fs.readFileSync('./cats.json')
  cats = JSON.parse(cats)
  cats.splice(req.params.idx, 1)
  fs.writeFileSync('./cats.json', JSON.stringify(cats))
  res.redirect('/cats')
})




module.exports = routerOne
