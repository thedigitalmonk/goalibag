var user = require('../models/User');

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
    
    user.findOne(
        {email: email, password: password},
        function(err, user) {
            if(err) throw err;
            if(!user) return res.status(404).send();
            return res.status(200).send();
        }
    );
}