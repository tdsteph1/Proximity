//dependencies
var path = require("path");


module.exports = function(app) 
{
	//Each of the below routes just handles the HTML page that the user gets sent to.

	//Home Page(/) login.html
	app.get("/", function(req, res) 
    {
    	res.sendFile(path.join(__dirname, "../public/login.html"));

  	});

  	app.get("/test", function(req, res) 
    {
    	res.sendFile(path.join(__dirname, "../public/test.html"));

  	});


};