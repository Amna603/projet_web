const db = require('../models/index');
const User = require('../models/userModel');

exports.getWelcomeMessage = function(req, res,next) {
    /*
    console.log(session);
    if (session.loggedIn) {
        // Output username
        /*await User.findOne({where : {id:req.params.id} })
        .then(data => {
            res.json(data);
        })
        res.json({statusCode: 200, success: true, message:"Welcome" + res.session.username + '!'});
        res.send('Welcome back, ' + req.session.username + '!');
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
    res.end(); */
    //console.log(req.session);
    if(req.isAuthenticated()){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0') 
        return next()

    }
    //console.log(req.user.id);
} 
exports.getAuth = function(req,res) {
    res.sendFile('/login.html', { root:'.' });

} 

exports.getRegister = function(req,res){
    res.sendFile('register.html', { root:'.'});
}

