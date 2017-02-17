'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const config = require('../../config/environment')
const databases = require('../../databases')

const authTypes = ['facebook', 'google']

var UserSchema = new Schema({
  name: String,
  // We don't make this mandatory field as user can choose to authenticate using oAuth.
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  // oAuth provider
  provider: String,
  facebook: {},
  google: {}
})

/**
 * Virtuals: Virtual attributes are attributes that are convenient to have around but that do not get persisted to mongodb.
 */

// Public profile information
UserSchema
  .virtual('profile')
  .get(() => {
    return {
      'name': this.name,
      'role': this.role
    }
  })

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(() => {
    return {
      '_id': this._id,
      'role': this.role
    }
  })

/**
 * Validations:
  - Validation is an internal piece of middleware.
  - Validation occurs when a document attempts to be saved, after defaults have been applied.
  - Validation is asynchronously recursive: when you call Model#save, embedded documents validation is executed. 
      If an error happens, your Model#save callback receives it. 
  - There are some in-build validators such as enum, min etc
 */
// NOTE: Lamda expression was not working and was returning empty object for 'this', so as a fix used anonymous function till we find a reason.
// Validate empty email
UserSchema
  .path('email')
  .validate(function(email){
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true
    return email.length
  }, 'Email cannot be blank')

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    // if you are authenticating by any of the oauth strategies, don't validate
    console.log('provider ', this.provider)
    if (authTypes.indexOf(this.provider) !== -1) return true
    return hashedPassword.length
  }, 'Password cannot be blank')

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this
    //findOne is method in Schema not instance of schema.Thus we should call this.constructor.findOne
    this.constructor.findOne({email: value}, (err, user) => {
      if(err) throw err
      if(user) {
        if(self.id === user.id) return respond(true)
        return respond(false)
      }
      respond(true)
    })
}, 'The specified email address is already in use.')

var validatePresenceOf = (value) => {
  return value && value.length
}

/**
 * Pre-save hook: validate and hash password
 */
UserSchema
  .pre('save', function(callback) {
    var user = this
    // break out if password not changed
    if (!user.isNew) return callback()

    if (!validatePresenceOf(user.hashedPassword) && authTypes.indexOf(user.provider) === -1)
      callback(new Error('Invalid password'))
    else{
      //hash password
      bcrypt.genSalt(config.salt.userSaltWorkFactor, (err, salt) => {
      if (err) return callback(err)
      bcrypt.hash(user.hashedPassword, salt, null, (err, hash) => {
        if (err) return callback(err)
        user.password = hash
        callback()
      })
    })
  }

  })

/**
 * Methods: Each schema can also define their methods, which can be used by instances.
 */
UserSchema.methods = {
  /**
   * verifyPassword - check if the passwords are the same
   *
   */
  verifyPassword: function(password, callback){
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) return callback(err)
      callback(null, isMatch)
    })
  }

}

module.exports = databases.commonDb.model('User', UserSchema)
