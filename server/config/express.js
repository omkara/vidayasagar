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
const morgan = require('morgan')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const config = require('./environment')

module.exports = function(app) {

	// app.set('views', config.root + '/server/views')
	app.set('html', require('ejs').renderFile)

	app.use(compression())
	app.use(bodyParser())
	app.use(cookieParser())
	app.use(passport.initialize())
	// An application has only one session, passport uses same session as express to add it's own properties.
	app.use(passport.session());
	app.use(morgan('dev'))

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
