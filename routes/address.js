const express = require('express')
const router = express.Router()

const { 
  createAddress, 
  getAddresses, 
  getAddressDefault, 
  updateAddress, 
  deleteAddress } = require('../controllers/addressController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/addresses').get(isAuthenticatedUser, getAddresses)
router.route('/address/default').get(isAuthenticatedUser, getAddressDefault)
router.route('/address/new').post(isAuthenticatedUser, createAddress)
router.route('/address/:id')
  .put(isAuthenticatedUser, updateAddress)
  .delete(isAuthenticatedUser, deleteAddress)

module.exports = router
