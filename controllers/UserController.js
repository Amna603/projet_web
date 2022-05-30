const db = require('../models/index');
//const User = require('../models/userModel');
var User = require('../models/userModel');
//var jwt = require('../services/jwt');
const jwt = require("jsonwebtoken");
require("dotenv").config();
var bcrypt = require('bcrypt-nodejs');
const session = require('express-session');

//db.User;

exports.login = async function(req, res, next) {
  let user = User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message:
            "Auth failed!! either the account does't exist or you entered a wrong account"
        });
      }
      bcrypt.compare(req.body.password, user.passwordHash, function(err, result){
        if (err) {
            throw new Error(err);
          
        }
        if (result) {
          const token = jwt.sign(
            {
              user: user
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          // on stocke mon user pour pouvoir savoir quel utilisateur est connecté
        req.session.user ={user:user.username, id: user.userId}
          res.status(200).json({
            message: "Auth granted, welcome!",
            token: token,
          });


        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};




exports.register = async function(req, res) {
    
    let user = User.build({ username: req.body.username, passwordHash: req.body.password, email: req.body.email })
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
                    if (err)
                        return res.status(500).send({message: "Saving user error."});
                    user.passwordHash = hash;
                });
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