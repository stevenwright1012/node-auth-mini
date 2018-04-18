const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require(`${__dirname}/strategy.js`);

const app = express();


app.use(session({
    secret: 'asdflasdflkj',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy)

passport.serializeUser((user, done) => {
    console.log(user);
    
    done(null, { id: user.id, display: user.displayName, nickname: user.nickname});
});
passport.deserializeUser((obj, done) => {
    console.log("deserialize", obj);
    
    done(null, obj);
})

app.get('/login', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/me',
    failureRedirect: '/login/endpoint',
    failureFlash: true,
}))
app.get('/me', (req, res, next) => {
    console.log(req.user);
    
    if(req.user){
        res.status(200).send(JSON.stringify(req.user, null, 10));
    }else{
        console.log('whatever');
        
        res.redirect('/login');
    }
})


const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );