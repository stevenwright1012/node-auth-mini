const config = require(`${__dirname}/config.js`);
const Auth0strategy = require('passport-auth0')

const {domain, clientID, clientSecret} = config;

module.exports = new Auth0strategy({
    domain: domain,
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: '/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done){

    console.log("PROFILE", profile);
    
    return done(null, profile)
})