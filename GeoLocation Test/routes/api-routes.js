// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var path = require("path");
var loginInfo = require("../public/assets/js/loginInfo.js");
var guid = require("guid");
var CryptoJS = require("../public/assets/js/encryptor.js");
var decryptor = require("../public/assets/js/decryptor.js");

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
  /*app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html")); //creating the pathway for this file
  });*/

  //gets all users from database - userinfo table
  app.get("/", function(req, res) {
    db.sequelize.query("SELECT * FROM userinfos",{type: db.sequelize.QueryTypes.SELECT}).then((result) => {
      console.log(result);
      res.sendFile(path.join(__dirname, "../public/login.html")); //creating the pathway for this file
    });
  });

  //obtains the username and password of the person signing in
  app.get("/api/:email_pass", function(req, res) {
    var exists = false;

    console.log("api/email");

    var email = loginInfo[0];
    var pass = loginInfo[1];
//loginInfo[1] = "";
    loginInfo = []; //clears the array of userinfo

    //query userinfo table and determine whether or not the user exists, checks the username and password
    db.sequelize.query("SELECT * FROM userinfos;", {type: db.sequelize.QueryTypes.SELECT}).then((result) => {
      for (var i = 0; i < result.length; i++) {
        if (email === result[i].email && pass === decryptor.decryptPassword(result[i].password)) {
          /*&& pass === decryptor.decryptPassword(result[i].password*/
          exists = true;
          var obj = result[i];
        }
      }
      /*cb(exists, obj);*/
      res.send(exists);
    });
  });

  //Creates a new user
  app.post("/api/proximity", function(req, res) {
    var newUser = req.body;
     console.log(newUser.password);
    db.userInfo.create({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: CryptoJS.encryptPassword(newUser.password),//newUser.password,
      gender: newUser.gender
    }).then(function(dbNewUser) {
      console.log("enc: " + dbNewUser.password);
      res.json(dbNewUser.id);
    });
  });

  // pushes the email and password into the loginInfo remote array
  app.post("/api/login", function(req, res) {
    loginInfo.push(req.body.email);
    loginInfo.push(req.body.password);
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
      userID: userTimeAndLocation.userID,
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



  //


  // DELETE route for deleting todos. We can get the id of the todo we want to delete from
  // req.params.id
  /*app.delete("/api/todos/:id", function(req, res) {

  });*/

  // PUT route for updating todos. We can get the updated todo from req.body
  /*app.put("/api/todos", function(req, res) {

  });*/
};
