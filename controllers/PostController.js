const db = require('../models/index');
const Post = db.Post;
const User = db.User;
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const multer = require("multer");
const fs = require("fs");

exports.uploadFiles = async function(req,res){
	var postId = req.params.id;
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.status(200).send(`You must select a file.`);
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
         "/public/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
         "./public/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error when trying upload images: ${error}`);
  }

}


exports.getPosts = async function(req,res){
		var user = req.cookies.jwt
	console.log(user);
	await User.findAll({include: [Post]})
	.then(data=> {
		console.log("All of posts : " , JSON.stringify(data,null, 2));
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
		else res.statu(400).json({message: 'No Posts for this user'})
	}


exports.CreatePost = async function(req,res) {	

	var postId = req.params.id;
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.status(200).send(`You must select a file.`);
    }

    let post = Post.create({
      userId : 8,
      message : req.body.message,
      type: req.file.mimetype,
      name: req.file.originalname,
      imaga: fs.readFileSync(
         "./public/uploads/" + req.file.filename
      ),
    }).then((post) => {
      fs.writeFileSync(
         "./public/" + post.name,
        post.image,
        res.json(post)
      );


      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error when trying upload images: ${error}`);
  }




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
        await Group.update(
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
    else res.status(400).json({ message: 'Group not found' })
}

exports.PostDelete = async function (req, res) {
    if (req.params.id) {
            await Group.destroy({ where: { id: req.params.id } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: 'Group not found'})
}
