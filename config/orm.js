//import MySQL connection
var connection = require("../config/connection.js");
var guid = require("guid");
var CryptoJS = require("crypto-js");
var encryptor = require("../public/assets/js/encryptor.js")
var decryptor = require("../public/assets/js/decryptor.js")

var orm =
{
	//Display everthing currently in the database/ burgers TABLE
	selectAll: function(tableInput, cb)
	{
		/*
		// Encrypt
		var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');


		// Decrypt
		var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
		var plaintext = bytes.toString(CryptoJS.enc.Utf8);

		console.log(ciphertext.toString());
		console.log(plaintext);
	    */
	   

		var queryString = "SELECT * FROM " + tableInput + ";";

		connection.query(queryString, function(err, result)
		{
			if(err)
			{
				throw err;
			}

			/*
			for(var i = 0; i < result.length; i++)
		    {
			    console.log("ID: " + result[i].id + " | " +
						    "First Name: " + result[i].firstName + " | " +
							"Last Name: " + result[i].lastName + " | " +
							"Email: " + result[i].email  + " | " +
							"Password: " + result[i].password  + " | " +
							"Gender: " + result[i].gender );

		    }
		    */

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