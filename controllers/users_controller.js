module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUpIn = function(req, res){
    return res.render('user_signUpIn', {
        title: 'SignIn'
    });
}