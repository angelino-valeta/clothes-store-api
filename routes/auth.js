const express = require('express')
const router = express.Router()

const { 
  register,
  login,
  logout,
  getMe,
  updatePerfile,
  updatePassword,
  deleteAccount
} = require('../controllers/authController') 

const { isAuthenticatedUser } = require('../middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', isAuthenticatedUser, getMe)
router.put('/update', isAuthenticatedUser, updatePerfile)
router.put('/password/update', isAuthenticatedUser, updatePassword)
router.delete('/deleteAccount', isAuthenticatedUser, deleteAccount)


module.exports = router
