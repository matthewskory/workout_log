var express=require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');


//actually create a table
sequelize.sync(); //user.sync({force:true}); - will completely drop the table and recreate it each time it runs

app.use(bodyParser.json());
app.use(require('./middleware/headers'));

//create user.js route
app.use('/api/user', require('./routes/user'));

//opens an api end point for the request sent to the api/test site
app.use('/api/test', function(req, res){
	res.send("hello world");
});


app.listen(3000, function(){
	console.log('app is listening on port 3000');
});
