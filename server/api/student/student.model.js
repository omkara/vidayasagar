'use strict'

const mongoose 		= require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const databases 	= require('../../databases')
const Schema 		= mongoose.Schema

var studentSchema = new Schema({
	rollNumber: Number,
	firstName: String,
	lastName: String,
	email: String,
	dateOfJoninig: Date,
	fatherName: String,
	motherName: String,
	contact: String,
	address: [String]
})

/*studentSchema.plugin(autoIncrement.plugin, {
	model: 'Student',
	field: 'rollNumber',
	startAt: 1,
	incrementBy: 1
})*/

module.exports = databases.commonDb.model('Student', studentSchema)
