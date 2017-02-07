/* Generating random users to populate data */

const _ 	  = require('lodash')
const async   = require('async')
const Student = require('../api/student/student.model')
const config  = require('./environment')
const resetDB = require('../scripts/resetDatabase')

const STUDENTS = 20

const phoneNumberGenrator = () => {
	var temp = []
	for(var i = 0; i < 10; i++) {
		temp.push(_.random(0, 9))
	}
	return  '+91-' + temp.toString().replace(/,/g, '')
}

function prepareStudentData() {
	var students = []
	for(var i = 1; i <= STUDENTS; i++) {
		students.push(Student({
		rollNumber: i,
		firstName: 'demo' + i,
		lastName: 'dummy' + (i*i),
		email: 'demo' + i + '@gmail.com',
		dateOfJoninig: new Date(),
		fatherName: 'fatherOf' + 'demo' + i,
		motherName: 'motherOf' + 'demo' + i,
		contact: phoneNumberGenrator(),
		address: ['dummyAddress1, dummyCity', 'dummyAddress2, dummyCity']
		}))
	}

	return students
}

function createStudent(student, callback) {
	student.save((err) => {
		if(err)
			console.log('Getting error on creating record')
		callback(err, err ? null : 'done')
	})
}

function createStudents(callback) {
	console.log('seeding user....please wait !!')
	var students = prepareStudentData()
	async.each(students, createStudent, callback)
}

module.exports = (callback) => { async.series([resetDB, createStudents], (err, res) =>{
		if(err) 
			console.log('Error in populating database!!')
		else 
			console.log('Seeding user....done!!!')
		callback(err, err ? null : res)
	})
}
