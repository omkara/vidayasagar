'use strict'

const User = require('../user/user.model')
const passport = require('passport')
const config = require('../../config/environment')
const auth = require('../../auth')
const async = require('async');



/**
 * TEST LOGIN function exposed. After login implemented this must be removed
 */
exports.login = (req, res, next) => {
  passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  })
  var userId = req.user._id
  console.log('req.user: '+ req.user);
  console.log('creating token for user: '+userId)
  User.findOne({_id: req.user._id}, '-hashedPassword', (err, user) => { // don't ever give out the password
    if (err) return next(err)
    if (!user) return res.json(401)  
    var token = auth.signToken(userId);
    console.log('token: '+token)
    res.json({
      'user' : user,
      'token' : token
    })
  })
}

//TODO: implement it
exports.register = (req, res, next) => {

}
