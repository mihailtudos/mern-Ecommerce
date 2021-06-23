import asyncHandler from 'express-async-handler';
import Category from "../models/Category.js";
import Product from "../models/Product.js";

// @desc    Fetch all product categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {};

  const count = await Category.countDocuments({ ...keyword });
  const categories = await Category.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
  res.json({categories, page, pages: Math.ceil(count / pageSize)});
})

// @desc    Create a category
// @route   POST /api/category
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name } =  req.body;
  console.log( req.body)
  const category = new Category({
    name,
    products : 0
  })

  const createdCategory = await category.save();

  res.status(201).json(createdCategory);
});


export {
  getCategories,
  createCategory
}