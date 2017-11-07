var express = require("express");
var path = require("path");
var loginInfo = require("../public/assets/js/loginInfo.js")
var signedInUser = require("../public/assets/js/signedInUser.js")

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

		//TRY: res.json(proximityObject); here, which will display API of
		//our Table objects EX: API: { [ ]}
	});

	//This allows us to open up home page(login.html)
	//NOTE: DO NOT USE Routes/html_routes.js && api_routes since
	//      having those prevents GET from working properley.
	//      instead have controller deal with those 2 things.
	res.sendFile(path.join(__dirname, "../public/login.html"));		
});

//This is for existing user siging in (email), (password)
router.get("/api/:email_pass", function(req, res)
{
	var Exists;

	console.log("api/email");
	//console.log("email_pass " + loginInfo[0] + " " + loginInfo[1]);
		
	//obtain array of characters (email) ,(delimeter) (password) 
	//then obtain the current user values logging in (email) & (password)
	//The reason we are using a remote array inside (loginInfo.js) becuase
	//req.params.email_pass gives us and array of characters with delimiter.
	//EX: (email),(password) and using the index[] only returns a letter.
	var email = loginInfo[0];
	var pass =  loginInfo[1];
	

	//Clear loginInfo area in case user refreshes page on current session
	//in order to get new email and pas at index 0, 1 and not previous ones.
	loginInfo = [];


	//(req.params.email_pass) contains an array of characters: email & password.
	//instead of (req.params.email_pass) we use (email) & (pass) instead.
	//furnction(data) gets executed by orm.js/findExistingUser/cb(exists).
	proximity.findExistingUser(email, pass, function(data, obj)
	{
		

		//Displays inside console the mySQL array of TABLE objects
		//stored inside our proximity table.
		console.log("controller " + data);
		console.log("controller " + obj);
		//console.log("controller" + obj.email);

		if(data === true)
		{


			var signInUserObject =
			{
				obj: obj,
				signIn: data
			}

			console.log("obj " + signInUserObject.obj);
			console.log("obj " + signInUserObject.signIn);
		}
		//displays an array of MySQL TABLE objects when we do (http://localhost:3000/api/email_pass)
		//Also invokes the callback(.then(function()) function at login.js/.then(function(data).
		//Furthermore (data) is a boolean value which determines if user exists or not when signing in.
		//data: contains boolean value so (http://localhost:3000/api/email_pass) displays true or false
		res.json(data);

		//If user exists open up main (profile page)
		
		
	});

	
	
});

//POST
//runs concurrently with $.ajax/POST
router.post("/api/proximity", function(req, res)
{
	//here we are invoking insertOne() function inside (models/proximity.js).
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

//POST(login)
//Email & Password get stored inside a remote array
router.post("/api/login", function(req, res)
{
	//Store user loing email inside an remote array (loginInfo.js)
	 loginInfo.push(req.body.email);
	 loginInfo.push(req.body.password);

	 //console.log("login em " + loginInfo[0]);
	 //console.log("login em " + loginInfo[1]);

	
});





//Export routes for server.js to use.
module.exports = router;

