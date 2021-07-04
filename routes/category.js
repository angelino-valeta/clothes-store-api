const express = require('express')
const router = express.Router()

const { 
  createCategory, 
  getCategories, 
  getCategory, 
  updateCategory, 
  deleteCategory } = require('../controllers/categoryController')

const { isAuthenticatedUser, authorize } = require('../middlewares/auth')

router.get('/categories', getCategories)
router.get('/category/:id', getCategory)
router.post('/admin/category/new', isAuthenticatedUser, authorize('admin'), createCategory)
router.route('/admin/category/:id')
  .put(isAuthenticatedUser, authorize('admin'),updateCategory)
  .delete(isAuthenticatedUser, authorize('admin'),deleteCategory)

module.exports = router
