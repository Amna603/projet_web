const db = require('../models/index');
const User = require('../models/userModel');
var jwt = require('../services/jwt');
//const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.getWelcomeMessage = function(req, res,next) {


    console.log(req.session);

} 
exports.getAuth = function(req,res) {
    res.sendFile('/login.html', { root:'.' });

} 

exports.getRegister = function(req,res){
    res.sendFile('register.html', { root:'.'});
}

