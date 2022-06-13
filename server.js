const mysql = require('mysql');
const express = require('express');
require("dotenv").config();
const session = require('express-session');
const bcrypt = require('bcryptjs');	
const app = express();
var serverPort = 8080;
var bodyParser = require('body-parser')
app.use(express.static('public/tmp'));
app.use(express.static('public'));

const Sequelize = require('sequelize')
const db = require('./db.js')

// CORS enable
const cors = require('cors');
app.use(cors());

const path = require("path");  
app.use("/tmp", express.static("tmp"));  

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
	//store: sessionStore
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let cookieParser = require('cookie-parser');
app.use(cookieParser());
/*
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 }); //cors problems
*/
//db.sync({force: true})


let router = require('./routes');
app.use("/", router)

 // Launch app to listen to specified port
app.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
})