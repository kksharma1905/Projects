const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const  User = require('../models/user');


// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'  
    },
    function(email,password, done){
        //find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){ console.log("Error in finding user --> Passport"); return done(err);}

            if(!user || user.password != password){
                console.log("Invalid Username and Password --> Passport");
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// Deserializing the user from the key int the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){ 
            console.log("Error in finding user --> Passport"); 
            return done(err);
        }
        console.log("User is Authorised while making request");
        return done(null, user);    
    });
});

//Check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    //If the user is signed in \, then pass on request to next funciton (Controller Action)
    if(req.isAuthenticated()){
        console.log("User Authenicated");
        return next();
    }    

    //if User is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // request.user contains the current sign in from session the cookie and we are just sending it to locals for the views
        res.locals.user = req.user;
    }
    next();
} 

module.exports = passport;