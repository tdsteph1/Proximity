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
    res.sendFile(path.join(__dirname, "../index.html")); //creating the pathway for this file
  });

  // Return all users within x feet
    app.post("/api/proximityUsers", function(req, res) {
      //gets the current latitude and longitude from the post request.
      var latitude = req.body.latitude, 
      longitude = req.body.longitude,
      distance = req.body.distance

      //uses sequelize to call a stored procedure which returns users and their distance. Sends this information through the response
      db.sequelize.query("CALL getProximity(" + latitude + ", " + longitude + ", " + distance + ");", {type: db.sequelize.QueryTypes.SELECT}).then((query) => {
        res.send(query);
      });
    });

  // Create New User Location - takes in JSON input
  app.post("/api/new/userTimeAndLocation", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var userTimeAndLocation = req.body;

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
