const Express = require('express')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

let app = Express()

app.set('view engine', 'ejs')
app.use(Express.static(__dirname + '/public'))
app.use(layouts)
app.use(Express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/cats', require('./controllers/cats'))
app.use('/dogs', require('./controllers/dogs'))

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('3000 connected')
})