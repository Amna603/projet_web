const db = require('../models/index');
const Post = db.Post;
const User = db.User;
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const multer = require("multer");
const fs = require("fs");


exports.getPosts = async function(req,res){
	var user = req.cookies.jwt
	//console.log(user);
	await Post.findAll({include: [User]})
	.then(data=> {
		//console.log("All of posts : " , JSON.stringify(data,null, 2));
		res.json(data);
	})
	.catch(err => {
		res.status(500).json({ message: err.message})
	})

}

exports.getPost = async function(req,res){
	if(req.params.id) {
			await Post.findOne({ where : { id:req.params.id }} )
			.then(data => {
				res.json(data);
			})
			.catch(err => {
				res.status(500).json({message: err.message})
			})
		}
		else res.status(400).json({message: 'No Posts for this user'})
	}


exports.CreatePost = async function(req,res) {	
	var postId = req.params.id;
 	console.log(req.session);
   if (req.file == undefined) {
      return res.status(400).send(`You must select a file.`);
    }

    let post = Post.build({
      userId : req.body.userId,
      message : req.body.message,
      name: req.file.originalname,
      image: fs.readFileSync(
         "./public/uploads/" + req.file.filename
      )

    })
    await post.save()
    .then((post) => {
      fs.writeFileSync(
         "./public/tmp/" + post.name,
        post.image,
        res.json(post),
      );

    })
   .catch (err => {
     console.log('This is the rejected field ->', err.field);

  	res.status(500).json({ message: err.message })
  })

}


exports.getUserPosts = async function(req,res){
	if(req.params.userId) {
		await Post.findOne({ where : { userId:req.params.userId }} )
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.status(500).json({message: err.message})
		})
	}
	else res.statu(400).json({message: 'No Posts for this user'})
}




exports.PostUpdate = async function (req, res) {
    if (req.params.id > 0) {
        await Post.update(
            { message: req.body.message }, 
            { where: { id: req.params.id } }
            )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Post not found' })
}

exports.PostDelete = async function (req, res) {
    if (req.params.id) {
            await Post.destroy({ where: { id: req.params.id } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: 'Post not found'})
}
