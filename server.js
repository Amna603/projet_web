const mysql = require('mysql');
const express = require('express');
require("dotenv").config();
const session = require('express-session');
const bcrypt = require('bcryptjs');	
const app = express();
var serverPort = 8080;
//const mysqlStore = require('express-mysql-session')(session);

const Sequelize = require('sequelize')
const db = require('./db.js')

// CORS enable
const cors = require('cors');
app.use(cors());



/*

const options ={
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true
    
}

*/
//const  sessionStore = new mysqlStore(options);

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


//db.sync({force: true})


let router = require('./routes');
app.use("/", router)

 // Launch app to listen to specified port
app.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
})