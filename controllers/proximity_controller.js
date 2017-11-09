var express = require("express");
var path = require("path");
var loginInfo = require("../public/assets/js/loginInfo.js")
var mysql = require("mysql");


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

//loginTable(stores the current user that's logging into profile page)
router.get("/api/userInfo", function(req, res)
{

	proximity.selectAllUsers(function(data)
	{
		var proximityObject =
		{
			proximity: data
		}

		//Displays inside console the mySQL array of TABLE objects
		//stored inside our proximity table.
		console.log("proximity Obj " + proximityObject);
		res.json(data);

		//TRY: res.json(proximityObject); here, which will display API of
		//our Table objects EX: API: { [ ]}
	});

});



//DELETE signed in user when user logs out
router.delete("/api/userInfo/:id", function(req, res) 
{
  var condition = "id = " + req.params.id;

  proximity.delete(condition, function(result) 
  {
    if (result.affectedRows == 0) 
    {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } 
    else 
    {
      res.status(200).end();
    }

  });
});


router.get("/hello",function(req,res){
	console.log(req);
	res.json({data:"hello"});
});

router.get("/messages",function(req,res){
	
	console.log(req.query.email);
	proximity.findExistingUser(email,"password1",function(data,obj){
		console.log(data);
	});
});

router.post("/messages",function(req,res){
	var message = req.query.message;
	var sender = req.query.email;
	// make request to post message here
	var reciever = req.query.emailSentTo;
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
	// //EX: (email),(password) and using the index[] only returns a letter.
	// var email = req.query.email;
	// var pass = req.query.pass;
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

			console.log("obj " + signInUserObject.obj.email);
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
		console.log("insert " + result);
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

//POST request which passes in the current users 
//coordinates and returns users near those coordinates
router.post("/api/proximityUsers", function(req, res) 
{
	var coorObj;
    //gets the current latitude and longitude from the post request.
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var date = req.body.date;
    var time = req.body.time;
    var coordinates = req.body.coordinates;
    var accuracy = req.body.accuracy;
    var id = req.body.userID;

    console.log("lat " + latitude);
    console.log("lon " + longitude);
  
    
    //uses sequelize to call a stored procedure which returns users and their distance. Sends this information through the response
    proximity.setCoordinates(["latitude", "longitude", "date", "time", "coordinates", "accuracy", "userId"], 
    						[latitude, longitude, date, time, coordinates, accuracy, id], function(result)
    {
	
    		//console.log("coor " + coorObj);
    		res.json(result);

    });

});

//loginTable(stores the current user that's logging into profile page)
router.get("/api/userCoordinates", function(req, res)
{
console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd");
	proximity.selectAllCoordinates(function(data)
	{
		var coordinatesObject =
		{
			proximity: data
		}

		//Displays inside console the mySQL array of TABLE objects
		//stored inside our proximity table.
		console.log("coordinates obj " + coordinatesObject.proximity);
		res.json(data);

		//TRY: res.json(proximityObject); here, which will display API of
		//our Table objects EX: API: { [ ]}
	});

});





//Export routes for server.js to use.
module.exports = router;

