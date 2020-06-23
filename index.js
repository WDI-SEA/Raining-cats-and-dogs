let express = require('express')
let layouts = require('express-ejs-layouts')
let fs = require('fs')
let methodOverride = require('method-override')

let app = express()

app.set('view engine', 'ejs')
// this allows me to use my css file in the public folder 
app.use(express.static(__dirname + '/public'))
app.use(layouts)
//this installs body parser so we can read our users data from the form
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/dogs', require('./controllers/dogs'))
app.use('/cats', require('./controllers/cats'))


app.get('/', (req, res) => {
    res.render('home')
})


app.listen(3000, () => {console.log('Tuned into port 3000 ✨')})