var express = require("express");

//(router) will get imported by (server.js)
var router = express.Router();

//import the models(proximity.js) in order to use its database functions
var proximity = require("../models/proximity.js");



module.exports = function(app) 
{







};




//Export routes for server.js to use.
module.exports = router;