//definition model needs a description, logtype, owner 

module.exports = function(sequelize, DataTypes){

//creates a workout model using sequelize
var Definition = sequelize.define('definition',{

		description: DataTypes.STRING,
		logType: DataTypes.STRING,
		owner: DataTypes.INTEGER
});
	return Definition;
};