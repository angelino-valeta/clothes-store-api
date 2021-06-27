const express = require('express')
const router = express.Router()

const { registerUser, login, logout, getUsers} = require('../controllers/authController') 

router.route('/register').post(registerUser)

router.route('/login').post(login)

router.route('/logout').get(logout)

// admin
router.route('/admin/users').get(getUsers)

module.exports = router
