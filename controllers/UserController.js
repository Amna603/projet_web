const db = require('../models/index');
//const User = require('../models/userModel');
var User = require('../models/userModel');
var jwt = require('../services/jwt');
//const jwt = require("jsonwebtoken");
require("dotenv").config();
var bcrypt = require('bcrypt-nodejs');
const session = require('express-session');


//db.User;

exports.login = async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
  if(username && password){
    const user = await User.findOne({ attributes:["username","userId"], where:{ username: req.body.username } })
                .then(data => {
                    console.log(data);
                    res.json(data);

                req.session.username = username;
                req.session.loggedIn = true;
                //req.session.username = req.params.userId;
                const session = req.session;
                //req.session.username = id;

                
            })
                .catch(err => {
                res.status(500).json({ message: err.message })
            })
            const token = jwt.sign(
              {username },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            // save user token
            user.token = token;

            // return new user
            res.status(201).json(user);
}

}

exports.register = async function(req, res) {
    
    let user = User.build({ username: req.body.username, passwordHash: req.body.password, email: req.body.email })
        await user.save()
        .then(data => {
            console.log(user.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
        bcrypt.hash(req.body.password, null, null, (err, hash) => {
                    if (err)
                        return res.status(500).json({message: "Saving user error."});
                    user.password = hash;
                });
}
exports.userDelete = async function(req,res){
    if(req.params.id){
        await User.destroy({where: {userId : req.params.id}})
        .then(data => {
            res.json(data);
            console.log(data);
        }) 
        .catch(err => {
            res.status((500).json({message:err.message}))
        })
    }
    else res.status(400).json({message:'User not found'})
        console.log(req.params.userId)
}


exports.userUpdate = async function (req, res) {
    if (req.params.userId > 0) {
        await User.update(
            { username: req.body.username, email: req.body.email, passwordHash: req.body.password  },
            { where: { user_id: req.params.userId } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'User not found' })
}