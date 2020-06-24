let express = require('express')
let router = express.Router()
let fs = require('fs')

//render = file paths from view folders
//redirect = goes to a URL
//res.send sends an object

// Index
router.get("/", (req, res) => {
    let dogs = fs.readFileSync("./dogs.json");

    let dogData = JSON.parse(dogs);

    let nameFilter = req.query.nameFilter

    if(nameFilter){
        dogData = dogData.filter(dog => {
            return dog.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render("dogs/index", {myDogs: dogData})
})


// Add
// Get route to view new dog form
router.get("/new", (req, res) => {
    res.render("dogs/new")
})


// Show/Details
router.get("/:idx", (req, res) => {
    let dogs = fs.readFileSync("./dogs.json")
    let dogData = JSON.parse(dogs)
    let dogIndex = parseInt(req.params.idx)

    res.render("dogs/show", {myDog: dogData[dogIndex]})
})


// Create
router.post("/", (req, res) => {
    // read dogs file
    let dogs = fs.readFileSync("./dogs.json")
    dogs = JSON.parse(dogs)
    // add the new content to the dogs array
    dogs.push(req.body)
    // save the new array content to dogs.json
    fs.writeFileSync("./dogs.json", JSON.stringify(dogs))
    // redirect to the /dogs
    res.redirect("/dogs")
})

// Edit
// Get route to view edit dogs form
router.get("/edit/:idx", (req, res) => {
    let dogs = fs.readFileSync("./dogs.json")
    dogs = JSON.parse(dogs)
    res.render("dogs/edit", {dog: dogs[req.params.idx], dogId: req.params.idx})
})

// Update
router.put("/:idx", (req, res) => {
    let dogs = fs.readFileSync("./dogs.json")
    dogs = JSON.parse(dogs)
    // Select name & type of dog selected by its ID, then reassign name & type
    dogs[req.params.idx].name = req.body.name
    dogs[req.params.idx].type = req.body.type
    dogs[req.params.idx].image = req.body.image
    // rewrite the file
    fs.writeFileSync("./dogs.json", JSON.stringify(dogs))
    // redirect to main page - this is a URL
    res.redirect("/dogs")
})

// Destroy
router.delete("/:idx", (req, res) => {
    let dogs = fs.readFileSync("./dogs.json")
    dogs = JSON.parse(dogs)
    // Remove the selected dog from our "dogs" array
    dogs.splice(req.params.idx, 1)
    // Save over our dogs.json with the newly formatted dogs array.
    fs.writeFileSync("./dogs.json", JSON.stringify(dogs))
    // Once everything is done, we want to show the user the impact of their actions
    // by redirecting to the /dogs route to see all remaining dogs.
    res.redirect("/dogs")
})

module.exports = router;