/**
*	For database connection and config
*/

'use strict'

const _ 		= require('lodash')
const mongoose  = require('mongoose')
const config 	= require('./config/environment')
const autoIncrement = require('mongoose-auto-increment')

var db = mongoose.createConnection(config.mongo.uri, config.mongo.options)
autoIncrement.initialize(db)

function Databases() {
	this.commonDb = db.useDb('vidyasagar')
}

module.exports = new Databases()
