'use strict'

const passport = require('passport') 
const LocalStrategy   = require('passport-local').Strategy
const User            = require('../user/user.model')

module.exports = function(passport) {

    // passport session setup
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
/*    passport.serializeUser( (user, done) => {
        var sessionUser = { _id: user._id, name: user.name, email: user.email, role: user.role }
        done(null, sessionUser) //saved to session req.session.passport.user = {sessionUser:'..'}
    })

    passport.deserializeUser( (sessionUser, done) => {
        // The sessionUser object is different from the user mongoose collection
        // it's actually req.session.passport.user and comes from the session collection
        done(null, sessionUser) //sessionUser object attaches to the request as req.user
    })*/


    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });

    // Local Strategies : by default, if there is no name, it would just be called 'local'
    passport.use('local-login', new LocalStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    (req, username, password, done) => { 
        User.findOne({ 'email' :  username },'-hashedPassword', // by default passport field name is username
        (err, user) => {
            // In case of any error, return using the done method
            if (err)
                return done(err)
            if (!user){
                console.log('User NOT found with username '+username)
                return done(null, false, req.flash('message', 'User Not found.'))                 
            }
            // User exists but wrong password, log the error 
            if (!user.verifyPassword(password)){
                console.log('Invalid Password')
                return done(null, false, req.flash('message', 'Invalid Password'))
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            return done(null, user)
        })
    }))

 
    passport.use('local-registration', new LocalStrategy({
        passReqToCallback : true 
    },
    (req, done) => {
       var newUser = new User(req.body)
        User.findOne({email: newUser.email}, '-hashedPassword', 
        (err, doc) => {
            if (doc)
            console.log('user exists - ' + newUser.email)
            newUser.save((err, user) => {
                if (err) return done(null, err)
            return done(null,newUser)       
      })
    }) 

    }))




}