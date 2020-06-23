// Declare and require our dependencies / modules
let express = require("express");
let layouts = require("express-ejs-layouts");
let methodOverride = require("method-override");

// Declare our app
let app = express();

// Set our friendly view engine, EJS
app.set("view engine", "ejs")
// Set express static to look at our /public folder, giving us access to our sunny CSS
app.use(express.static(__dirname + "/public"))
app.use(layouts)
// Below is body-parser! Body-parser allows us to access the information we pass from
// the front-end!
app.use(express.urlencoded({extended: false}))
// Method-Override will allow us to use PUT & DELETE routes!
app.use(methodOverride("_method"))

//ejs version of a home route
app.get("/", function(req, res) {
    res.render("home");
    console.log("hello")
  });

app.listen(5000);
console.log("We are getting somewhere!!");