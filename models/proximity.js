//Import the orm to create function that will interact wiht the DB
//This allows us to utilize functions of (orm) object inside orm.js
var orm = require("../config/orm.js");



var proximity =
{


	insertOne: function(cols, vals, cb)
	{
		//invoke insertOne() function inside (orm.js)
		orm.insertOne("proximity", cols, vals, function(res)
		{
			cb(res);
		});
	},


	selectAll: function(cb)
	{
		orm.selectAll("proximity", function(res)
		{
			cb(res);
		});
	},

	findExistingUser: function(email, pass, cb)
	{

		orm.findExistingUser("proximity", email, pass, function(res, obj)
		{
			console.log("models " + res);
			console.log("models " + obj);
			cb(res, obj);
		});

	}








}


//Export for proximity_controller
module.exports = proximity;