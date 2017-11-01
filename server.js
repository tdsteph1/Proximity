//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

//import routes & give the server access to them
var routes = require("./controllers/proximity_controller.js");

//set up server
var PORT = process.env.PORT || 3000;
var app = express();

//server static content for app from the "public" directory in the application directory
app.use(express.static("public"));

//Routes
require("./routes/html_routes.js")(app);
//require("./controllers/proximity_controller.js")(app);

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//After routes has been imported give the server access to them
app.use("/", routes);

app.listen(PORT);