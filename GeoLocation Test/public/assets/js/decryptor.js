var CryptoJS = require("crypto-js");

var decryptor =
{

	decryptPassword: function(encryptedPass)
	{
		var bytes  = CryptoJS.AES.decrypt(encryptedPass, 'secret key 123');
		var plaintext = bytes.toString(CryptoJS.enc.Utf8);

		return plaintext
	}

}


//export for login.js
module.exports = decryptor;