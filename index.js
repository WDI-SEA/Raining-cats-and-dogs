let express = require('express')
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')
let fs = require('fs')

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(layouts)
app.use(methodOverride('_method'))
// Below is body-parser
app.use(express.urlencoded({ extended: false }))
// Method-Override will alow us to use PUt & DELETE Routes
app.use('/cats', require('./controllers/cats'))
app.use('/dogs', require('./controllers/dogs'))

app.get('/', (req, res) => {
    res.render('home')
})



app.listen(8000);