//var connection = require("../config/connection.js");



var hobbies =[];
var interests = $("#interest").val();
var username= "";

var friendPool = [
{
	firstName: "Marco",
	lastName: "Khodr",
	age: 19,
	username: "marcorules456",
	picLink: "me1.png",
	bio: "Arizona"
},
{
	firstName: "Lisa",
	lastName: "Muka",
	age: 19,
	username: "mukarules456",
	picLink: "me2.png",
	bio: "Arizona"
},
{
	firstName: "Roman",
	lastName: "Ramiro",
	age: 19,
	username: "ramiro555",
	picLink: "me3.png",
	bio: "Arizona"
},
{
	firstName: "Gretcha",
	lastName: "Wix",
	age: 19,
	username: "wixie",
	picLink: "m4.png",
	bio: "Arizona"
},
{
	firstName: "Rebbeca",
	lastName: "Johnson",
	age: 19,
	username: "rebbeca4",
	picLink: "me5.png",
	bio: "Arizona"
}



];


$.get("/api/userInfo/", function(data)
{
	console.log("profile.js");
	console.log(data[0].email);
	console.log(data[0].firstName);
	console.log("size " + data.length);
	$("#theEmail").html(data[0].email);
	$("#theName").html(data[0].firstName);
	$("#theAge").html("25");
	$("#theLocation").html("Phoenix, AZ");

	//Clear table
	// Send the DELETE request.
    $.ajax("/api/userInfo/" + data[0].id, 
    {
      type: "DELETE",

    }).then(function() 
    {
        console.log("deleted cat", id);

        // Reload the page to get the updated list
        //location.reload();
    });
    


});
			


$.ajax({
	url: "http://localhost:3000/api/johndoe@gmail.com_password1",


}).done(function(response){
	console.log(response);
});

console.log(friendPool);

function searching(){



	for(var i =0; i<friendPool.length;i++){
		if(friendPool[i].username === "marcorules456"){
		var fullName = $("<h3>");
		var ager = $("<h3>");
		var location = $("<h3>");

		var screename = friendPool[i].firstName + " " + friendPool[i].lastName;
		var proAge = friendPool[i].age;
		
		fullName.text("Name: "+screename);
		ager.text("Age: "+proAge);
		location.text("Location: "+friendPool[i].bio);
		$(".infoBox").append(fullName);
		$(".infoBox").append(ager);
		$(".infoBox").append(location);
	}
		}

}


$("#editProfile").on("click",function(){
	
	$("#opal").animate({"opacity":1});
	$("#opal").attr("background-color:#00e6e6");
	$("#profileChange").addClass("activ");
	$("#editProfile").attr("background","#00e6e6");


});


$("#editProfile").on("dblclick",function(){
	$("#profileChange").removeClass("activ");
	$("#opal").animate({"opacity":0});
	$("#editProfile").attr("background","none");
	


});


$("#editHobby").on("click",function(){
		$("#editHobby").addClass("activ");
	$("#addTag").animate({"opacity":1});
	$("#addTag").src("background-color:#00e6e6");
	$(".hobbyContainer").attr("background","#00e6e6");




});


$("#editHobby").on("dblclick",function(){
	$("#editHobby").removeClass("activ");
	$("#addTag").animate({"opacity":0});
	$("#addTag").src("background-color:#f4f4f4");
	$(".hobbyContainer").attr("background","none");




});




$("#hobbySub").on("click",function(event){
event.preventDefault();
var interests = $("#interest").val();
	var hobbyButton = $("<button>");
	hobbyButton.addClass("btn btn-danger tag");
	hobbyButton.attr("opacity",0);
	hobbyButton.text(interests);

	hobbyButton.appendTo(".tagContain");
	hobbyButton.animate({"opacity":1});
});