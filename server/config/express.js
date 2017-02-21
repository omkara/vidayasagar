/**
* Express configuration
*/

'use strict'

const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const path 		= require('path')


const config = require('./environment')

module.exports = function(app) {

	// app.set('views', config.root + '/server/views')
	app.set('html', require('ejs').renderFile)
	app.use(express.static(path.join(path.normalize(__dirname + '/../..' ) + '/client')))
	app.use(compression())
	app.use(bodyParser())
	app.use(cookieParser())
	app.use(passport.initialize())

	app.use(session({
		secret: config.secret.session,
		store: new mongoStore({
			url: config.mongo.uri,
			collection: 'session',
			auto_reconnect: true
		}, () => { console.log('db connection open')})
	}))

	app.use(errorHandler())
}
