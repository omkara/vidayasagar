/* Implementation of API handlers */

'use strict'

const _ = require('lodash')
const path = require('path')
const Student = require('./student.model')

/* Fetching detail of all students */
exports.index = (req, res) => {
	Student.find({}, (err, students) => {
		if(err) return res.json(400, {error: err})
		return res.status(200).json(students)
	})
}

/* Fetching detail of single student */
exports.getStudent = (req, res) => {
	Student.findOne({rollNumber: req.params.roll}, (err, student) => {
		if(err) return res.status(500).json({error: err})
		if(!student) return res.status(400).json({message: 'Student not found!!'})
		return res.status(200).json(student)
	} )
}
