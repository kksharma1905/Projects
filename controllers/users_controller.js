const User = require('../models/user');

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render('user_profile',{
                   title: "User Profile",
                   user: user 
                });
            }else{
                return res.redirect('/users/sign-in');
            }
        });
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUpIn = function(req, res){
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
    //Steps to Autheticate
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding User in Signing In'); 
            return;
        }
        //handle user found
        if(user){
        //handle password not match
              if(user.password != req.body.password){
                    return res.redirect('back');
                }
                //handle session cretion
                 console.log('User Logged in Succesfully');
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
        
        }else{
            //handler user not found
            return res.redirect('back');
        }
    });
    //handle password which don't match

    //handle user not found 
}