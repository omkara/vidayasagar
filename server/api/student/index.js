'use strict'

const express = require('express')
const controller = require('./student.controller')
const config = require('../../config/environment')

const router = express.Router()

router.get('/', controller.index)   // Show all students detail
router.get('/:roll', controller.getStudent)  // Show detail of single student

module.exports = router
