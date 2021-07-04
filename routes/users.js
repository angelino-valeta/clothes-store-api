const express = require('express')
const router = express.Router()

const { 
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController') 

const { isAuthenticatedUser, authorize } = require('../middlewares/auth')

router.route('/admin/users')
  .get(isAuthenticatedUser, authorize('admin'), getUsers)
  .post(isAuthenticatedUser, authorize('admin'), createUser)
router.route('/admin/user/:id')
  .get(isAuthenticatedUser, authorize('admin'), getUser)
  .put(isAuthenticatedUser, authorize('admin'),updateUser)
  .delete(isAuthenticatedUser, authorize('admin'), deleteUser)

module.exports = router
