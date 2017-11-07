$(function()
{
	

	//Existing user logging in [LogIn] button
	$(".create-form").on("submit", function(event)
	{

		event.preventDefault();

		var email = $("#signInEmail").val().trim();
		var password = $("#signInPassword").val().trim();

		var signEmailPassword =
		{
			email: email,
			password: password
		};

		//POST: for storing email & password in our remote array (loginInfo.js)
		//post request which passes in the current users information into the database and returns that information
		$.post("/api/login", signEmailPassword, 'json')
		.done(function(response) {
			location.reload();
		});

		var email_password = [email, password];


		//Returns an array of characters email & password with delimiter(,)
		//EX_Email_Password: 	bob1@gmail.com,123
		$.get("/api/" + email_password, function(data)
		{
			console.log(data);
		}).then(function(data)
		{
			//console.log("New user Created! " + data);

			//data from our callback is boolean value which indicates
			//if the email and password exists if so then login user.
			
			if(data == true)
			{
				//Login in the user onto profile
				console.log("user exists");
				$(location).attr('href', 'test.html');

			}
			else
			{
				console.log("user does not exist");
			}
		});
	});

	//click [SignUp] button
	$("#sign-btn").on("click", function(event)
	{
		//prevents submit event
		event.preventDefault();

		//new user object
		var newUser = 
		{
			firstName: $("#firstName").val().trim(),
			lastName:  $("#lastName").val().trim(),
			email:     $("#email").val().trim(),
			password:  $("#password").val().trim(),
			gender:    $("[name=gender]:checked").val().trim() 	//Radio button gender value.
		}


		//send the POST request
		//this runs concurrently with (proximity_controller/rout.post(...) )
		$.post("/api/proximity", newUser, 'json')
		.done(function(response) {
			console.log("New user Created!");

			//$(location).attr('href', 'test.html');

			//reload the page to remove input inside textfields
			location.reload();
		});
	});
});