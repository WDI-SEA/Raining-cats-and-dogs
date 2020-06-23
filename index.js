var express = require('express')
var layouts = require('express-ejs-layouts')
var fs = require('fs')

var app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))//CSS enabled
app.use(layouts)
app.use(express.urlencoded({extended: false}))// this is to body parse - LOOK THIS UP