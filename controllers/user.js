var user = require('../models/User');
var adminController = require('./admin');

exports.addUser = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var newuser = new user();
    newuser.email = email;
    newuser.password = password;
    newuser.save(function(err, savedUser){
       if(err) throw err;
       return res.status(200).send();
    });
}

exports.loginUser = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    user.findOne({
      email: email,
      password: password
    }, function(err, user) {
            if(err) throw err;
            if(!user) {
              res.render('login', {
                message: "User not found"
              });
            }
            req.session.user = user;
            loggedIn = true;
            res.redirect('/dashboard');
        }
    );



}

exports.logout = function(req, res) {
    req.session.destroy();
    loggedIn = false;
    res.redirect('/');
}
