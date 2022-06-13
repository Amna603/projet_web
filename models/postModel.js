const Sequelize = require('sequelize');
const db = require('../db.js');


const Post = db.define('post', {
    id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    message: { type: Sequelize.STRING, allowNull: true },
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.BLOB("long"),
    },
    
});

module.exports = Post
