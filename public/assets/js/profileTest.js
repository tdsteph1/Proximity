var mysql = require("mysql");

var express= require("express");

var app = express();
app.listen(8080);

var connection = mysql.createConnection ({
	
	host:"localhost",
	port:3306,
	user:"root",
	password: "Thirdpi1",
	database: "profile"






});

function test(app){
	
	connection.query("SELECT * FROM profiles",function(err,res){
		console.log(res);
		 age = res.age;
		name = res.user;
		 pictureLink = res.picture;
		 bio = res.bio;
		 
	});
}

app.get("/",function(ereq,eres){
	
       eres.sendFile(__dirname+"/../../user_profile.html");
       	
       	
	});



