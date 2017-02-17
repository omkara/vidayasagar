'use strict'

const mongoose = require('mongoose')
const passport = require('passport')
const config = require('../config/environment')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const compose = require('composable-middleware') // allows a series of middlewares functions to act as one composed middleware
const User = require('../api/user/user.model')
const validateJwt = expressJwt({ secret: config.secret.session })

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // find token in body/query/header
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      console.log('authorizing by token: '+token)
      if(token) {
        req.headers.authorization = 'Bearer ' + token
      }
      console.log('validating Jwt...');
      validateJwt(req, res, next)
    })
    // Attach user to request
    .use((req, res, next) => {
        next()
      })
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set')

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      var roles = config.userRoles.ids()
      if (roles.indexOf(req.user.role) >= roles.indexOf(roleRequired)) {
        next()
      }
      else {
        res.send(403)
      }
    })
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  var token = jwt.sign({ _id: id }, config.secret.session, { expiresIn : 60*500 })
  console.log('token obtained:' + token)
  return token
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'})
  var token = signToken(req.user._id, req.user.role)
  res.cookie('token', JSON.stringify(token))
  res.redirect('/')
}

exports.isAuthenticated = isAuthenticated
exports.hasRole = hasRole
exports.signToken = signToken
exports.setTokenCookie = setTokenCookie