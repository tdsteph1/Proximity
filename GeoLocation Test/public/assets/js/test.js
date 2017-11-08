//Seperate this file to Test.js

//alert("t");
		//moment.js function which gets the current date
		var getCurrentDate = () => {
			var currentDate = moment().utc().format("MM/d/YYYY");
			return currentDate;
		};

		//moment.js function which gets the current time
		var getCurrentTime = () => {
			var currentTime = moment().utc().format("H:mm:ss");
			return currentTime;
		};

		//gets current userID
		/*var getCurrentUserID = () => {
			var currentUserID;
			return currentUserID;
		};*/

		//function which gets the current users location. Has an optional parameter for repetition
		var getLocation = (repeater) => 
		{
			var apiResponse;

			//Function which runs if getting the users location was successful
			var c = function(position) 
			{

				//stores coordinates into variables
				var latitude = position.coords.latitude,
				longitude = position.coords.longitude,
				accuracy = position.coords.accuracy,
				coords = latitude + ", " + longitude;

				//Updates google map on page with the current location
			

				//stores variables into an object
				var userLocation = 
				{
					//get user id of signed in user and replace 2 with that id
					//api call to get id passed in here
					"userID": 2, //create function to get current userID;
					//"userID": getCurrentUserID();
					"date": getCurrentDate(),
					"time": getCurrentTime(),
					"coordinates": coords,
					"latitude": latitude,
					"longitude": longitude,
					"accuracy": accuracy
				};

				//post request which passes in the current users information into the database and returns that information
				$.post("api/new/userTimeAndLocation", userLocation, 'json')
				.done(function(response) 
				{
					apiResponse = response;
	
				});

				//if optional repeater parameter exists, run the repeater function
				if (repeater) 
				{
					repeater();
				}

			};

			//Function to get the current location. If succesfull, runs function C. If error, runs function E.
			navigator.geolocation.getCurrentPosition(c, e, {
				enableHighAccuracy: true,
				maximumAge: 60000,
				timeout: 2000
			});
			//return false;
			return apiResponse;
		};

		var e = function(error) {
			if (error.code === 1 ) {
				alert("unable to get location");
			} else if (error.code === 2) {
				alert("Internet connection failed.");
			} else if (error.code === 3) {
				alert("connection timed out");
			}
		}

	

		//function which repeats get location for a set amount of time and a set number of times
		var repeater = ((duration, quantity) => {
			var counter = 0;
			var repeatLocation = setInterval(() => {
				getLocation();
				counter++;
				if (counter >= quantity) {
					clearInterval(repeatLocation);
				}
			}, duration);
		});

		//function to call the database and get other users who are near you
		//make variable proxusers;
		var getProximity = ((distance) => 
		{

			var apiResponse;

			//Function which runs if getting the users location was successful
			var c = function(position) 
			{

				//stores coordinates in variables
				var latitude = position.coords.latitude,
				longitude = position.coords.longitude,
				accuracy = position.coords.accuracy,
				coords = latitude + ", " + longitude;

				//stores variables into an object
				var data = {
				"latitude": latitude,
				"longitude": longitude,
				"distance": distance
				};


				//post request which passes in the current users coordinates and returns users near those coordinates
				$.post("/api/proximityUsers", data, "json")
				.done(function(response) 
				{
					//assign the response to variable(proxUsers)
					apiResponse = response;

					var res = response[0]; //puts the response into a variable
					var resLength = Object.keys(res).length; //gets the array length

					//loops through each item in the response and does something
					//put inside function and return response that contains userID, id, firstName ...)
					for (var i = 0; i < resLength; i++) { 
						console.log("PROXIMITY USER " + i);
						console.log("UserLocations ID: " + res[i].userID);
						console.log("UserInfos ID: " + res[i].id);
						console.log("First Name: " + res[i].firstName);
						console.log("Last Name: " + res[i].lastName);
						console.log("Email: " + res[i].email);
						console.log("Password: " + res[i].password);
						console.log("Gender: " + res[i].gender);
						console.log("Profile Picture: " + res[i].profilePicture);
						console.log("Date: " + res[i].date);
						console.log("Time: " + res[i].time);
						console.log("Coordinates: " + res[i].coordinates);
						console.log("Latitude: " + res[i].latitude);
						console.log("Longitude: " + res[i].longitude);
						console.log("Accuracy: " + res[i].accuracy + " feet");
						console.log("Distance in Miles: " + res[i].distanceMiles + " miles");
						console.log("Distance in Feet: " + res[i].distanceFeet + " feet");
						console.log("\n");
					};
				});
				 
			
			};

			//function which runs if the browser cannot get the users location
			var e = function(error) {
				if (error.code === 1 ) { //error code 1 is when the user does not give us permission to get their location
					alert("unable to get location");
				} else if (error.code === 2) {
					alert("Internet connection failed."); //error code 2 is when there is no internet connection
				} else if (error.code === 3) {
					alert("connection timed out"); //error code 3 is when the connection times out
				}
			};

			//Function to get the current location. If succesfull, runs function C. If error, runs function E.
			navigator.geolocation.getCurrentPosition(c, e, {
				enableHighAccuracy: true,
				maximumAge: 60000,
				timeout: 2000
			});
			//return false;
			return apiResponse;
			

		});

		$(document).ready(() => {
			//gets the users location and repeats it. Parameter 1 is how many miliseconds to repeat, and parameter 2 is how many times to repeat
			//getLocation();

			//gets the users location and finds other users in the database within a distance of whatever feet is passed into the function
			getProximity(30);
		})