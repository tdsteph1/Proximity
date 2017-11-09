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

	setCoordinates: function(cols, vals, cb)
	{
		orm.setCoordinates("userLocation", cols, vals, function(res)
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

	selectAllCoordinates: function(cb)
	{
		orm.selectAllCoordinates("userLocation", function(res)
		{
			cb(res);
		});
	},

	selectAllUsers: function(cb)
	{
		orm.selectAll("logIn", function(res)
		{
			cb(res);
		});
	},

	findExistingUser: function(email, pass, cb)
	{

		orm.findExistingUser("proximity", email, pass, function(res, obj)
		{
			
			cb(res, obj);
		});

	},


	delete: function(condition, cb) 
  	{
    	orm.delete("logIn", condition, function(res) 
    	{
      		cb(res);
    	});
  }








}






//Export for proximity_controller
module.exports = proximity;