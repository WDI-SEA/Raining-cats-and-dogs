// Import the modules
var express = require('express');
let layouts = require("express-ejs-layouts");
let methodOverride = require("method-override");
// Create an instance of an express app
var app = express();

// Set the view enging
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Require controllers
app.use("/dogs", require("./controllers/dogs"));
app.use("/cats", require("./controllers/cats"));

// Create a Home Route
app.get("/", (req, res) => {
    res.render("home");
});

// Port to listen on
app.listen(8000);
console.log("Listening to PORT:8000")