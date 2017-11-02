var somefunction = function() {
	console.log("this is a basic function");
};

var somefunction = () => {};

var a = () => {
	b();
	console.log("this is a");
	
};

var b = () => {
	console.log("this is b")
};

var c = (x) => {
	x();
	console.log("this is c");
};
var d = () => {
	console.log("this is d")l
};


a();
c(d);
