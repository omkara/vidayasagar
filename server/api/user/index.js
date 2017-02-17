'use strict'

const express = require('express')
const controller = require('./user.controller')
const config = require('../../config/environment')
const auth = require('../../auth')
const router = express.Router()

router.get('/', controller.index)
router.get('/:id', auth.isAuthenticated(), controller.getUserProfile)
router.get('/me', auth.isAuthenticated(), controller.me)
router.delete('/:id', auth.hasRole('admin'), controller.delete)
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword)
router.post('/', controller.create)

module.exports = router
