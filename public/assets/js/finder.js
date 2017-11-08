var friendPool = [
{
	firstName: "Marco",
	lastName: "Khodr",
	age: 19,
	username: "marcorules456",
	picLink: "assets/image/me1.png",
	bio: "Arizona"
},
{
	firstName: "Lisa",
	lastName: "Muka",
	age: 19,
	username: "mukarules456",
	picLink: "assets/image/me2.png",
	bio: "Arizona"
},
{
	firstName: "Roman",
	lastName: "Ramiro",
	age: 19,
	username: "ramiro555",
	picLink: "assets/image/me3.png",
	bio: "Arizona"
},
{
	firstName: "Gretcha",
	lastName: "Wix",
	age: 19,
	username: "wixie",
	picLink: "assets/image/nutty.jpg",
	bio: "Arizona"
},
{
	firstName: "Rebbeca",
	lastName: "Johnson",
	age: 19,
	username: "rebbeca4",
	picLink: "assets/image/me5.jpg",
	bio: "Arizona"
}



];


var idCounter="id"+0;
var background = [];
// $.ajax({
// 	url: "http://localhost:3000/user",
// 	method: "GET",
// 	crossDomain: true,
// 	data: {email: "johndoe@email.com"}

// }).done(function(data){
// console.log(data);
// });

$.ajax ({
	url: "http://localhost:3000/api/:email_pass",
	method: "GET",
	crossDomain: true,
	data: {email: "johndoe@gmail.com",pass:"password1"}

}).done(function(response){
	console.log(response);
});

function tinderRoll(){

for (var i =0; i<friendPool.length;i++){
var profileDiv = $("<div>");
profileDiv.addClass("profileContainer");
profileDiv.addClass("box"+i);
profileDiv.appendTo(".finderContainer");

var profileImg= $("<img>");
profileImg.addClass("profileImage");
profileImg.attr("src",friendPool[i].picLink);
profileImg.appendTo(".box"+i);
var infoDiv = $("<div>");
infoDiv.addClass("infoContainer");
infoDiv.addClass("info"+i);
var names = $("<p>");
names.addClass("fullNames");

names.attr("data-full","fullName");
names.text("Name: "+ friendPool[i].firstName + " " + friendPool[i].lastName);


var ages = $("<p>");
ages.text("Age: "+ friendPool[i].age);
ages.addClass("aging");
ages.attr("data-age","fullName");
var locations = $("<p>");
locations.text("Location: "+ friendPool[i].bio);
infoDiv.appendTo(".box"+i);
locations.addClass("coordinates");

$(".info"+i).append(names);
$(".info"+i).append(ages);
$(".info"+i).append(locations);



var hobbyDiv = $("<div>").text("Hobbies: ");
hobbyDiv.addClass("hobbyContainer");

hobbyDiv.appendTo(".box"+i);var hobbyDiv = $("<div>");




}


}

tinderRoll();


