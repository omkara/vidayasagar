'use strict'

const User = require('./user.model')
const passport = require('passport')
const config = require('../../config/environment')
const auth = require('../../auth')
const async = require('async');

var validationError = (res, err) => {
  return res.json(422, err)
}

var validationError = (res, field, err) => {
  var errJson = {  
   name: 'ValidationError',
   message: 'Validation failed',
   errors: {
   }
  }

  var fieldJson = {
     'name': "ValidatorError",
     'type': 'user defined',
     'path': field,
     'message': err
  }

  errJson.errors[field] = fieldJson

  return res.json(422, errJson)
}

/**
 * Get list of users, without password in any form
 */
exports.index = (req, res) => {
  User.find({}, '-hashedPassword', (err, users) => {
    if(err) return res.send(500, err)
    res.json(200, users)
  })
}

/**
 * Creates a new user
 */
exports.create = (req, res, next) => {
  var newUser = new User(req.body)
    User.findOne({email: newUser.email}, (err, doc) => {
      if (doc) {
        // user exists -- assume this as newUser, so rest of the flow works
        console.log('user.controller.create(): user exists - ' + newUser.email)
      } 
      newUser.save((err, user) => {
        if (err) return validationError(res, err)
        res.send(200)       
      })
    })
}

/**
 * Get a single user profile
 */
exports.getUserProfile = (req, res, next) => {
  var userId = req.params.id
  console.log('getting user profile for user: '+ userId)
  User.findById(userId, (err, user) => {
    if (err) return next(err)
    if (!user) return res.send(401)
    res.json(200,user.profile)
  })
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if(err) return res.send(500, err)
    logger.info('Deleted :'+user)
    return res.send(204)
  })
}

/**
 * Change a users password
 */
exports.changePassword = (req, res, next) => {
  var userId = req.user._id
  var oldPass = String(req.body.oldPassword)
  var newPass = String(req.body.newPassword)

  User.findById(userId, (err, user) => {
    if(user.verifyPassword(oldPass)) {
      user.password = newPass
      user.save((err) => {
        if (err) return validationError(res, err)
        res.send(200)
      })
    } else {
      res.send(403)
    }
  })
}

/**
 * Get my info
 */
exports.me = (req, res, next) => {
  var userId = req.user._id
  User.findOne({_id: userId}, '-hashedPassword', (err, user) => { // don't ever give out the password
    if (err) return next(err)
    if (!user) return res.json(401)
    console.log('Get information of :'+user)
    res.json(user)
  })
}



