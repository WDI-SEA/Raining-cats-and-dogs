# Raining Cats and Dogs (Homework)

We've catalogued dinos, we've catalogued cryptids. We're making apps and taking names. Now it's time to take the names of some famous felines and preeminent puppers.

---
## Prerequisite Knowledge

* Routes — [Notes](https://gawdiseattle.gitbook.io/wdi/05-node-express/00readme-1/01intro-to-express/02routes)
* Using a Templating Language — [Notes](https://gawdiseattle.gitbook.io/wdi/05-node-express/00readme-1/01intro-to-express/04templates)
* Controllers and Layouts — [Notes](https://gawdiseattle.gitbook.io/wdi/05-node-express/00readme-1/01intro-to-express/01organization) 
* POST/PUT/DELETE Routes — [Notes](https://gawdiseattle.gitbook.io/wdi/05-node-express/00readme-1/01intro-to-express/00readme)

--- 
## Goal

For this assignment, you're going to build an app that lists out famous cats and dogs. The context and extent of their fame is up to you—they can be real or fictional, domestically or familially famous—but a user will be able to log on and see a list of famous dogs or cats along with a picture and what they're famous for. You'll add data to the two JSON files provided.

---
### 0. Fork and Clone this repository

You'll be doing pull requests to turn this in, so fork it to your Github account and clone it to your local machine.

### 1. Create an express app

Make an express app! This folder has nothing but a readme and some JSON files! 
* Make an entry point
* NPM init
* Install dependencies
* Create your `.gitignore` and add `node_modules` and `package-lock.json` to it
* Set up your additional directories (views, static, routes/controllers)

### 2. Stub out your routes

You'll need all 7 RESTful routes for dogs and cats, stub out all 14 routes with a simple `res.send` or `console.log` for your non-GET routes. The seven routes are:
1. Index
2. Show/Details
3. Add
4. Create
5. Edit
6. Update
7. Destroy


### 3. Stub out your views
**Hint:** You will need to have two folders inside your `views` directory, one for `cats` and one for `dogs`. Make sure to change your `res.render()` statements accordingly! 

### 4. Flesh out your GET routes

Get data showing on the page first, then focus on your forms. Do they trigger the right console logs in your routes? Are they going to the right place?

### 5. Implement your POST, PUT, and DELETE routes

Make your POST route first since it doesn't require middleware, then move onto PUT and DELETE.

### 6. STYLE

Make it look less like raw HTML and more like the awesome app it is!

## BONUS!

* Style it so each item on the index page is a card
* Have a default image if one isn't applied
* Create some failsaves for edge cases (i.e. what happens if someone sends an empty form?)
