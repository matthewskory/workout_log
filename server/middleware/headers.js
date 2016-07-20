module.exports = function( req, res, next){
	res.header('access-control-allow-origin', '*'); //allows for multiple origin API requests
	res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');  //allows us to get post put and delete	
	res.header('access-control-allow-headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authrization'); //
	next();
};