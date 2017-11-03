// Dependencies
// =============================================================
var express = require("express"); //enables the server and allows it to listen, and lets me use it and to do restful api requests.
var bodyParser = require("body-parser");//enables to see the data - req.body wouldn't exist without this. Converts whatever I pass into as an JSON object.
var path = require("path"); //part of node. we don't have to download this. in our routes, it allows us to use paths in our routing. path helps you get to where you are

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

//Requireing our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
// =======================================
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});