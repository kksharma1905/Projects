const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

//
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss', // from where to pick up scss file to convert it into css
    dest: './assets/css',
    debug: true, //do i want to display some error when it cannot convert to css
    outputStyle: 'extended',
    prefix: '/css'  // 
}));

//Reconize request object as string or array (Its Middleware)
app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Using assets
app.use(express.static('./assets'));


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store is usedt to store the session cookie in db
app.use(session({
    name: 'kakes',
    // TODO change the secret key 
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        
            mongooseConnection: db,
            autoRemove: 'disabled'
        
    }, function(err){
        console.log(err || "connect-mongo Db setup ok");
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
