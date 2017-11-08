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
		//console.log("email " + vals[0]);
		//console.log("password " + vals[2]);
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
				connection.query("INSERT INTO logIn (email, password) VALUES (?, ?)",
				[email, pass],

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

		 //var encryptMsg = encryptor.encryptPassword('my message');
	    //console.log(encryptMsg);

	    //var decryptMsg = decryptor.decryptPassword(encryptMsg);
	    //console.log(decryptMsg)

		
		//Obtain the value of password stored at vals[3] and encrypt password.
		//then store encrypted password back to vals[3].
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


	}





};










//Export for (proximity.js)
module.exports = orm;