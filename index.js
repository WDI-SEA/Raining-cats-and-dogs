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
// the front-end; allows us to do this through a form
app.use(express.urlencoded({extended: false}))
// Method-Override will allow us to use PUT & DELETE routes!
app.use(methodOverride("_method"))

//use our contollers
//bring bits of our app into one big app
//first argument is the anchor
app.use("/cats", require("./controllers/cats"));

app.use("/dogs", require("./controllers/dogs"));

//ejs version of a home route
//not in a controller and not anchored to anything
app.get("/", function(req, res) {
    res.render("home");
    console.log("hello")
  });

app.listen(5000);
console.log("We are getting somewhere!!");