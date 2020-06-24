let express = require('express')
let router = express.Router()
let fs = require('fs')

// Index
//this means that when we go to the url bar this is the path we want to go to
router.get("/", (req, res) => {
    let cats = fs.readFileSync("./cats.json");

    let catData = JSON.parse(cats);

    let nameFilter = req.query.nameFilter

    if(nameFilter){
        catData = catData.filter(cat => {
            return cat.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render("cats/index", {myCats: catData})
})

// Add
//treat this route as exclusive
//either hit THIS route OR the route below
// Get route to view new cats form
router.get("/new", (req, res) => {
    res.render("cats/new")
})

// Show/Details
// Get route to view *ONE* cat's information
//it does not matter what the name is for idx
//idx is a parameter - that's why we call params for our request
router.get('/:idx', (req, res) => {
    let cats = fs.readFileSync('./cats.json')
    let catData = JSON.parse(cats)
    let catIndex = parseInt(req.params.idx)
    console.log(req.params.idx + "is my id")
    res.render('cats/show', {myCat: catData[catIndex]})
})

// Create
//for post routes, it is a post route path, it is not physical to the user
//not a browser URL, not a file path
//just a post route identifier
router.post("/", (req, res) => {
    // read cats file
    let cats = fs.readFileSync("./cats.json")
    cats = JSON.parse(cats)
    // add the new content to the cats array
    cats.push(req.body)
    // save the new array content to cats.json
    fs.writeFileSync("./cats.json", JSON.stringify(cats))
    // redirect to the /cats
    res.redirect("/cats")
})

// Edit
// Get route to view edit cats form
router.get("/edit/:idx", (req, res) => {
    let cats = fs.readFileSync("./cats.json")
    cats = JSON.parse(cats)
    res.render("cats/edit", {cat: cats[req.params.idx], catId: req.params.idx})
})

// Update
//put is also a unique thing where it is not a browser URL or a file path
router.put("/:idx", (req, res) => {
    let cats = fs.readFileSync("./cats.json")
    cats = JSON.parse(cats)
    // Select name & type of cat selected by its ID, then reassign name & type
    cats[req.params.idx].name = req.body.name
    cats[req.params.idx].type = req.body.type
    cats[req.params.idx].image = req.body.image
    // rewrite the file
    fs.writeFileSync("./cats.json", JSON.stringify(cats))
    // redirect to main page
    res.redirect("/cats")
})

// Destroy
//it is possible to have mutltiple methods with the same action
//you cannot have duplicate actions for the same method
router.delete("/:idx", (req, res) => {
    let cats = fs.readFileSync("./cats.json")
    cats = JSON.parse(cats)
    // Remove the selected cat from our "cats" array
    cats.splice(req.params.idx, 1)
    // Save over our cats.json with the newly formatted cats array.
    fs.writeFileSync("./cats.json", JSON.stringify(cats))
    // Once everything is done, we want to show the user the impact of their actions
    // by redirecting to the /cats route to see all remaining cats.
    res.redirect("/cats")
})


module.exports = router;