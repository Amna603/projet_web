const Sequelize = require('sequelize');
const db = require('../db.js');

const User = db.define('user', {
    userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
    username: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    passwordHash: { type: Sequelize.STRING, allowNull: false }
    
});

module.exports = User
