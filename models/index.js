const Sequelize = require('sequelize');
const sequelize = require('../db.js');


const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/userModel');
db.Post = require('../models/postModel');

//association 
db.User.hasMany(db.Post, {foreignKey: "id" });
db.Post.belongsTo(db.User, {foreignKey : "userId"});

module.exports = db;