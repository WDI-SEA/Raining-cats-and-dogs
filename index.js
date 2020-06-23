var express = require('express')
var layouts = require('express-ejs-layouts')
var fs = require('fs')
var methodOverride = require('method-override')

var app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))//CSS enabled
app.use(layouts)
app.use(express.urlencoded({extended: false}))// this is to body parse - LOOK THIS UP

app.use(methodOverride('_method'))
app.use('/cats', require('./controllers/cats'))
app.use('/dogs', require('./controllers/dogs'))

app.get('/', (req,res) => {
    res.render('home')
})

app.listen(8000, () => {console.log('Hi 💗💗')})