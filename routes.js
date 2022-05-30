let express = require('express');
let router = express.Router();


// import controller 
const UserController = require('./controllers/UserController');
const IndexController = require('./controllers/IndexController');
const PostController = require('./controllers/PostController');
const upload = require("./upload");

router.get('/', IndexController.getAuth);


// user routes
router.post('/login',UserController.login);
router.get('/register',IndexController.getRegister);
router.post('/register', UserController.register);
router.put('/users:id', UserController.userUpdate);
router.delete('/users:id', UserController.userDelete);
router.get('/home', IndexController.getWelcomeMessage);


// posts routes

router.get('/posts', PostController.getPosts);
router.post('/posts', upload.single("file"), PostController.CreatePost);
router.get('/posts:id', PostController.getPost);
router.put('/posts:id', PostController.PostUpdate);
router.delete('/posts:id', PostController.PostDelete);

module.exports = router;