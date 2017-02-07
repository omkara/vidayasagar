/* Script to reset database: Delete all collections and record */
const _ 		= require('lodash')
const async 	= require('async')
const mongoose  = require('mongoose')
const config 	= require('../config/environment')

module.exports = (callback) => {
	async.auto({
		conn: createConnection,
		collections: ['conn', (res, done) => { getCollections(res.conn, done) }],
		delete: ['collections', (res, done) => { deleteCollections(res.conn, res.collections, done) }],
		close: ['delete', (res, done) => { closeConnection(res.conn, done) }]
		}, (err, result) => {
			if(err)
				console.log('Some Error occured: ', err)
			else
				console.log( 'Database reset....done!!')
			callback(err, err ? null : result)
		}
	)
}


function createConnection(callback) {
	var conn = null
	// check if already connected to db
	if(mongoose.connection.readyState == 0) {
		conn = mongoose.createConnection(config.mongo.uri)
	}
	console.log('Creating connection....done!!')
	callback(null, conn)
}

function getCollections(conn, callback) {
	conn.on('open', (ref) => {
		conn.db.listCollections().toArray((err, names) => {
			callback(err, err ? null : _.map(names, 'name'))   // return array of name of collections
		})
	})
}

function deleteCollections(conn, collections, callback) {
	async.each(collections, async.apply(deleteCollection, conn), callback)
}

function deleteCollection(conn, collection, callback) {
	console.log('Dropping collection: ' +  collection + '....done!!' )
	conn.db.dropCollection(collection, callback)
}

function closeConnection(conn, callback) {
	conn.close((err) => {
		if(err)
			console.log('Error in closing connection ', err)
		else
			console.log('Closing connection....done!!')
		callback(err, null)
	})
}

