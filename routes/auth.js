const express = require('express')
const router = express.Router()

const { registerUser, login, logout, getUsers, getUser, updateUser, deleteUser} = require('../controllers/authController') 

router.route('/register').post(registerUser)

router.route('/login').post(login)

router.route('/logout').get(logout)

// admin  
router.route('/admin/users').get(getUsers)
router.route('/admin/user/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router
