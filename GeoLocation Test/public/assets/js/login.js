$(function()
{
	//Global Array with error messages
	var errorDisplay = ["First Name", " Last Name", " Email", " Password", " Gender" ];
	var errorDisplay2 = ["Email ", "Password"];


	//Existing user logging in [LogIn] button
	$("#headerForm").on("submit", function(event)
	{

		event.preventDefault();

		var email = $("#signInEmail").val().trim();
		var password = $("#signInPassword").val().trim();

		var signEmailPassword =
		{
			email: email,
			password: password
		};


		//Error Handling
		if(signEmailPassword.email === "" || signEmailPassword.password === "")
		{

			console.error("Error Please enter all data inside textboxes");

			//Function finds out which fields are missing
			findEmptyField2();

			//Display modal2
			$("#myModal2").modal('show');


		}
		else
		{

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

				//data from our callback is boolean value which indicates
				//if the email and password exists if so then login user.
				if(data == true)
				{
					//Login in the user onto profile
					console.log("user exists");
					$(location).attr('href', 'test.html');


					//clear textfiels email & password
					$("#signInEmail").val("");
					$("#signInPassword").val("");

				}
				else
				{
					console.log("user does not exist or invalid credentials");

					//Display Error Message
					$("#myModal3").modal('show');
				}
			});
		}
	});

	//click [SignUp] button
	$("#sign-btn").on("click", function(event)
	{
		//prevents submit event
		event.preventDefault();

		var x = document.getElementById("radioMale").checked;
		var y = document.getElementById("radioFemale").checked;

		//If user does not enter all fields including raido button gender then produce erorr message modal.
		if( ( $("#firstName").val().trim() === "" || $("#lastName").val().trim() === "" || $("#email").val().trim() === "" || $("#password").val().trim()=== "") ||
		      (document.getElementById("radioMale").checked === false && document.getElementById("radioFemale").checked === false) )
		{
			console.error("Error Please enter all data inside textboxes")

			findEmptyField();


			//Display modal
			$("#myModal").modal('show');
		}
		else //everything is valid and updates new user to sql database
		{

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
		}
	});


	//Function1(Displays which field is empty inside Modal. That includes radio buttons)
function findEmptyField()
{
	//reset highlighted fields incase user re-enters
	$(".form-control").css("border", "1px solid rgba(0,0,0,.15)")

	//We store an array of error messages depending on which fields are empty
	var error = "";

	for(var i = 0; i < errorDisplay.length; i++)
	{
		//If i is eqal to index 4 deal with radio buttons condition
		if(i === 4)
		{
			if(document.getElementById("radioMale").checked === false && document.getElementById("radioFemale").checked === false)
			{
				error = error + errorDisplay[i];

			}

		}
		//Else deal with 4 textfields
		else if($(".f" + (i+1)).val().trim() === "")
		{
			//Highligh in red the textfield  where erroneous data occurs.
			$(".f" + (i+1)).css("border", "2px solid red");

			error = error + errorDisplay[i] + "<br>";

		}

		//Now insert Error message type inside modal body of the p tag
		$(".errorType").html(error);

	}

}

//This is for existing user when they sign in
function findEmptyField2()
{
	//reset highlighted fields incase user re-enters
	$(".form-control").css("border", "1px solid rgba(0,0,0,.15)")

	var error = "";
	

	for(var i = 0; i < errorDisplay2.length; i++)
	{
		if($(".s" + (i+1)).val().trim() === "")
		{
			error = error + errorDisplay2[i] + "<br>";

			//Highligh in red the textfield  where erroneous data occurs.
			$(".s" + (i+1)).css("border", "2px solid red");

		}

	}

	//Now insert Error message inside modal body of the ptag
	$(".errorType2").html(error);

}
});




