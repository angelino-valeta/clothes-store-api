const { Category } = require('../models')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Criar Category  => /api/v1/admin/category/new
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  
  const data = req.body

  const category = await Category.create(data)
  
  res.status(201).json({
    success: true,
    category
  })
})

// Buscar todas Categorias   => /api/v1/categories
exports.getCategories = catchAsyncErrors(async (req, res) => {

  const categories = await Category.findAll()

  res.status(200).json({
    success: true,
    count: categories.length,
    categories
  })
})


// Buscar uma      => /api/v1/category/:id
exports.getCategory = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params

  const category = await Category.findByPk(id)

  if(!category){
    return next(new ErrorHandler('Categoria não encontrada', 404))
  }

  res.status(200).json({
    success: true,
    category
  })
})

// Atualizar Category   => /api/v1/admin/category/:id
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  let category = await Category.findByPk(id)

  if(!category){
    return next(new ErrorHandler('Categoria não encontrada', 404))
  }
 
  category = await Category.update(data,{
    where: {
      id
    }
  })

  res.status(200).json({
    success: true,
    category
  })
})

// Delete Category   => /api/v1/admin/categories/:id
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params

  let category = await Category.findByPk(id)

  if(!category){
    return next(new ErrorHandler('Categoria não encontrada', 404))
  }

  await category.destroy()

  res.status(200).json({
    success: true,
    message: 'Categoria deletada'
  })
})