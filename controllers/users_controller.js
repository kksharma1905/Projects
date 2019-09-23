const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUpIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signUpIn', {
        title: 'SignIn'
    });
}
//get the Sign up Data
module.exports.create = function(req, res){
    console.log('Into Create Function');
    if (req.body.password != req.body.confirm_password){
        console.log('password comparison');
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding User in Signing Up'); return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in Creating User While Signing Up', err); 
                    return res.redirect('/users/sign-In');
                }else{
                    return res.redirect('/');
                }
            });
        }
        console.log('Nothing Happened');
    });
     
}

//Sign IN and create sesison
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

//Sign Out
module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}