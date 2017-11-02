$(function()
{


	$(".create-form").on("submit", function(event)
	{
		event.preventDefault();



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

		/*
		console.log(newUser.firstName);
		console.log(newUser.lastName);
		console.log(newUser.email);
		console.log(newUser.password);
		console.log(newUser.gender);
		*/

		//send the POST request
		//this runs concurrently with (proximity_controller/rout.post(...) )
		$.ajax("/api/proximity",
		{
			type: "POST",
			data: newUser

		}).then(function()
		{
			console.log("New user Created!");

			//$(location).attr('href', 'test.html');

			//reload the page to remove input inside textfields
			location.reload();

		});
		
	});







});