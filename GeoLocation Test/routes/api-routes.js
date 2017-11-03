// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  /*app.get("/api/todos", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Todo.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });*/

  // POST route for saving a new todo
  /*app.post("/api/todos", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbTodo) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbTodo);
    });
  });*/

  // Basic route that sends the user first to the AJAX Page
  app.get("/", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "../index.html")); //creating the pathway for this file
  });

  // Create New User Location - takes in JSON input
  app.post("/api/new/userTimeAndLocation", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var userTimeAndLocation = req.body;

    console.log(userTimeAndLocation);
    console.log("\n");

    db.userLocation.create({
      userName: userTimeAndLocation.userName,
      date: userTimeAndLocation.date,
      time: userTimeAndLocation.time,
      coordinates: userTimeAndLocation.coordinates,
      latitude: userTimeAndLocation.latitude,
      longitude: userTimeAndLocation.longitude,
      accuracy: userTimeAndLocation.accuracy
    }).then(function(dbUserLocation) {
      // We then display the JSON to the users
      res.json(dbUserLocation);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo we want to delete from
  // req.params.id
  /*app.delete("/api/todos/:id", function(req, res) {

  });*/

  // PUT route for updating todos. We can get the updated todo from req.body
  /*app.put("/api/todos", function(req, res) {

  });*/
};
