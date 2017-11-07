




function finderRoll(){
	

for( var i=0; i<4; i++){

var messageBorder = $("<div>").addClass("row");

var buffer = $("<div>").addClass("col-xs-2");

var messageContainer = $("<div>").addClass("col-xs-10");
messageContainer.addClass("messageContainer");

var messageName = $("<h4>");

var profilePic = $("<img>").addClass("picPreview");

var message = $("<h3>").addClass("message").text("Example Text");
	profilePic.addClass(".pictureId"+i);
	messageContainer.addClass("messageContainerId"+i);
	  message.addClass("messageId"+i);
	profilePic.attr("src","egg.jpg");

	messageBorder.appendTo(".contain");
	profilePic.addClass("proLink");
	buffer.appendTo(".row");
	messageContainer.appendTo(".row");
	profilePic.appendTo(".messageContainerId"+i);
  	message.appendTo(".messageContainerId"+i);
}




}

finderRoll();