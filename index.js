const express = require('express');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const thisApp = express();
const fs = require('fs');

thisApp.set('view engine', 'ejs');
thisApp.use(express.static(__dirname + "/public"));
thisApp.use(layouts);
thisApp.use(express.urlencoded({extended: false}));
thisApp.use(methodOverride('_method'));
thisApp.use('/cats', require('./controllers/cats'));
thisApp.use('/dogs', require('./controllers/dogs'));

thisApp.get('/', (req, res) => {
    res.render('home');
})

thisApp.listen(3000, () => {
    console.log("Listening at 3000");
})
