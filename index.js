let express = require("express");
let layouts = require("express-ejs-layouts");
let methodOverride = require("method-override");

let app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(layouts);
// Below is body-parser!
app.use(express.urlencoded({ extended: false }));
// Method-Override will allow us to use PUT & DELETE routes!
app.use(methodOverride("_method"));
app.use("/dogs", require("./controllers/dogs"));
app.use("/cats", require("./controllers/cats"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
