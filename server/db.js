var Sequelize = require('sequelize');

//creates a new sequelize instance of the Sequelize constructor (connects to the db)
var sequelize = new Sequelize('workoutlog', 'postgres', 'sql', {
	host: 'localhost',
	dialect: 'postgres'
});
                     //promise
sequelize.authenticate().then(
		function(){
		console.log('connected to workoutlog posgres db');
		},
		function(){
			console.log(err);
		}
	);

var User = sequelize.import('./models/user');

module.exports = sequelize;