var express = require("express");

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

		console.log(proximityObject);

		//res.render("login.html", proximityObject);

		
	});

});



//POST
//runs concurrently with $.ajax/POST
router.post("/api/proximity", function(req, res)
{
	//here we are invoking insertOne() function inside (models/proximity.js)
	proximity.insertOne(["firstName", "lastName", "email", "password", "gender"], [req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.gender], function(result)
	{
		//Triggers $.ajax/.done(function() in order to reload page with updates
		res.json({

			id: result.insertId
		});

	});
});



/*
module.exports = function(app) 
{
	
 app.get("/api/:promity?", function(req, res) 
 {
 	if (req.params.characters) 
    {
      //NOTE req.params.character is obtained by url: localhost3000/api/luke or
      //when we search for luke and hit the [Search You Feelings you know it is true] button.

      // Then display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)
      
    }
    else
    {

    proximity.selectAll(function(data)
	{
		var proximityObject =
		{
			proximity: data
		}

		console.log(proximityObject);

		//res.render("login.html", proximityObject);

		
	});
    }


 });
 */

//Export routes for server.js to use.
module.exports = router;

