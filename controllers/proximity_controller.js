var express = require("express");
var path = require("path");

//(router) will get imported by (server.js)
var router = express.Router();

//import the models(proximity.js) in order to use its database functions
var proximity = require("../models/proximity.js");

//GET
router.get("/", function(req, res)
{

	proximity.selectAll(function(data)
	{
		var proximityObject =
		{
			proximity: data
		}

		//Displays inside console the mySQL array of TABLE objects
		//stored inside our proximity table.
		console.log(proximityObject);

/*
		res.render("index", 
		{
			plans: proximityObject
		});
*/
		
	});

	//This allows us to open up home page(login.html)
	//NOTE: DO NOT USE Routes/html_routes.js && api_routes since
	//      having those prevents GET from working properley.
	//      instead have controller deal with those 2 things.
	res.sendFile(path.join(__dirname, "../public/login.html"));
});

//POST
//runs concurrently with $.ajax/POST
router.post("/api/proximity", function(req, res)
{
	//here we are invoking insertOne() function inside (models/proximity.js)
	proximity.insertOne(["firstName", "lastName", "email", "password", "gender"], 
		                [req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.gender], 
		                function(result)
	{
		//Triggers $.ajax/.done(function() in order to reload page with updates
		res.json({

			id: result.insertId
		});

	});
});


//Export routes for server.js to use.
module.exports = router;

