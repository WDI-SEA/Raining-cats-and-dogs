let express = require('express')
let layouts = require('express-ejs-layouts')
let fs = require('fs')
let methodOverride = require('method-override')

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(layouts)
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/cats', require('./routes/cats'))
app.use('/dogs', require('./routes/dogs'))

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(3000, () => {console.log('dino port go')})