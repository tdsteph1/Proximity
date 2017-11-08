//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
 var io = require('socket.io');
//import routes & give the server access to them
var routes = require("./controllers/proximity_controller.js");
var cors = require("cors");
var router = express.Router();

//set up server
var PORT = process.env.PORT || 3000;
var app = express();

var server = require("http");
var socket = io(server.Server(app));
socket.on("connect",function(connection){
	connection.emit("hello",{message: "Hello"});

});
//server static content for app from the "public" directory in the application directory



//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));
app.use(cors());
//set up handlebars
//app.engine("handlebars", exphbs({defaultLayout: "main"}));
// app.set("view engine", "handlebars");

//After routes has been imported give the server access to them
app.use("/", routes);


app.listen(PORT);


app.get("/finder",function(req,res){
	res.sendFile(__dirname+"public/finder.html");

});
app.get("/profile",function(req,res){
	res.sendFile(__dirname+"public/profile.html");
	
});
