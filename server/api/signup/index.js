'use strict'

const express = require('express')
const controller = require('./signup.controller')
const router = express.Router()

router.post('/',controller.login)
router.post('/register', controller.register)

module.exports = router


