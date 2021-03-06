//import MySQL connection
var connection = require("../config/connection.js");
var guid = require("guid");
var CryptoJS = require("crypto-js");
var encryptor = require("../public/assets/js/encryptor.js")
var decryptor = require("../public/assets/js/decryptor.js")

var orm =
{
	findExistingUser: function(tableInput, email, pass, cb)
	{
		console.log("fixed " + email + " " + pass);
		
		var queryString ="SELECT * FROM " + tableInput + ";"

		//Bollean value we pass to our callback function to determine
		//if user exist to open the profile html page.
		var exists = false;

		connection.query(queryString, function(err, result)
		{
			if(err)
			{
				throw err;
			}

			for(var i = 0; i < result.length; i++)
			{
				//Check the userName && decrypted password(using function) all at the same time
				if(email === result[i].email &&  pass === decryptor.decryptPassword( result[i].password))
				{
					exists = true;

					//store object of mySQL Table element of array into variable
					var obj = result[i];
				}
			}

			//If user exists then store logged in user into the table for logged in user
			if(exists === true)
			{
				connection.query("INSERT INTO logIn (email, firstName, password) VALUES (?, ?, ?)",
				[email, obj.firstName, pass],

				function(err)
				{
					if(err) throw err;
					console.log("logIn database success");
				});
			}

			cb(exists, obj);
		});
	},

	//Display everthing currently in the database/ burgers TABLE
	selectAll: function(tableInput, cb)
	{
		
	   

		var queryString = "SELECT * FROM " + tableInput + ";";

		connection.query(queryString, function(err, result)
		{
			
			if(err)
			{
				throw err;
			}

			

			//without this then we would not have reload with updates on page
			cb(result);

		});


	},

	//Display everthing currently in the database/ burgers TABLE
	selectAllCoordinates: function(tableInput, cb)
	{
		
	   

		var queryString = "SELECT * FROM " + tableInput + ";";

		console.log(queryString);

		connection.query(queryString, function(err, result)
		{
			
			if(err)
			{
				throw err;
			}

			

			//without this then we would not have reload with updates on page
			cb(result);

		});


	},

	selectAllUsers: function(tableInput, cb)
	{
		
	   

		var queryString = "SELECT * FROM " + tableInput + ";";


		connection.query(queryString, function(err, result)
		{
			//var decryptMsg = decryptor.decryptPassword(result[0].password);
			//console.log("Current Password " + decryptMsg);

			if(err)
			{
				throw err;
			}

			

			//without this then we would not have reload with updates on page
			cb(result);

		});


	},


	//SQL table(proximity), cols or properites(column names), vals(column values), cb(function(result) on controller page)
	insertOne: function(table, cols, vals, cb)
	{

		var encryptMsg = encryptor.encryptPassword(vals[3]);

		vals[3] = encryptMsg;


		var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (?, ?, ?, ?, ?)";

		console.log(queryString);

		connection.query(queryString, vals, function(err, result)
		{
			if(err)
			{
				throw err;
			}

			//without this, we prevent the reload from occuring
			cb(result);
		});
	},

	//Insert Coordinates
	setCoordinates: function(table, cols, vals, cb)
	{
		console.log("set Coord " + vals);

		var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (?, ?, ?, ?, ?, ?, ?)";

		console.log(queryString);

		connection.query(queryString, vals, function(err, result)
		{
			if(err)
			{
				throw err;
			}

			//without this, we prevent the reload from occuring
			cb(result);
		});


	},

	//Deletes logged in users when signing out of our logIn TABLE
	//in order for the table not to overpopulate with multiple users.
	delete: function(table, condition, cb) 
  	{
    	var queryString = "DELETE FROM " + table;

    	queryString = queryString + " WHERE ";
    	queryString = queryString + condition;

    	connection.query(queryString, function(err, result) 
    	{
      		if (err) 
      		{
        		throw err;
      		}

      		cb(result);
    	});
  	}

};



//Export for (proximity.js)
module.exports = orm;