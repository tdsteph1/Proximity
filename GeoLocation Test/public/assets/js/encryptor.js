var CryptoJS = require("crypto-js");

var encryptor =
{

	encryptPassword: function(plaintextPass)
	{
		var ciphertext = CryptoJS.AES.encrypt(plaintextPass, 'secret key 123');

		return ciphertext.toString();
	}

}


//export for login.js
module.exports = encryptor;