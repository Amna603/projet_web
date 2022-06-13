let express = require('express');
let router = express.Router();

const multer = require("multer");

// import controller 
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
//const upload = require("./upload");
var upload = multer({dest:'./public/uploads'});


// user routes
//router.get('/users:userId', UserController.getUser);
router.get('/users', UserController.getUsers);
router.post('/login',UserController.login);
router.post('/register', UserController.register);
router.get('/users:userId', UserController.getUserId)
router.put('/users:userId', UserController.userUpdate);
router.delete('/users:userId', UserController.userDelete);


// posts routes

router.get('/posts', PostController.getPosts);
router.post('/posts', upload.single('image'), PostController.CreatePost); //upload.single("file"),
router.get('/posts:id', PostController.getPost);
router.put('/posts:id', PostController.PostUpdate);
router.delete('/posts:id', PostController.PostDelete);

module.exports = router;