/* Main application or server file */

'use strict'

const express = require('express')
const config = require('./config/environment')
const seedUser = require('./config/seeduser')

/* setup server */
const app = express()
const server = require('http').createServer(app)

require('./databases')
require('./config/express')(app)
require('./routes')(app)   // Todo - Routes implementations are still pending

// Populate DB with Sample data
if(config.seedDB) {
	seedUser((err, res) => {
		server.listen(config.port, () => { console.log('Express server listening on port: %d', config.port)})
	})
} else
	server.listen(config.port, () => { console.log('Express server listening on port: %d', config.port)})



