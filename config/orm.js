//import MySQL connection
var connection = require("../config/connection.js");
var guid = require("guid");


var orm =
{
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

			for(var i = 0; i < result.length; i++)
		    {
			    console.log("ID: " + result[i].id + " | " +
						    "First Name: " + result[i].firstName + " | " +
							"Last Name: " + result[i].lastName + " | " +
							"Email: " + result[i].email  + " | " +
							"Password: " + result[i].password  + " | " +
							"Gender: " + result[i].gender );

		    }

			//without this then we would not have reload with updates on page
			cb(result);

		});


	},


	//SQL table(proximity), cols or properites(column names), vals(column values), cb(function(result) on controller page)
	insertOne: function(table, cols, vals, cb)
	{
		//guid.value = "go suck it, guid!";
        //guid.value;

        //guid.equals('6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d');

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