const Sequelize = require('sequelize')

const sequelize = new Sequelize({
	host     : 'localhost',
	user     : 'root',
	password : 'test',
	database : 'nodelogin',
	dialect  : 'mysql'
	
});




module.exports = sequelize