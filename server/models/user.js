module.exports = function(sequelize, DataTypes){
//creates a user model using sequelize
var User = sequelize.define('user',{

	username: {type: DataTypes.STRING, unique: true}, //unique:true makes it only accept unique names
	passwordhash: DataTypes.STRING
});
	return User;
};