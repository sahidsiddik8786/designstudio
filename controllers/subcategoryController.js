// controllers/subcategoryController.js
import Subcategory from '../models/subcategoryModel.js';
import slugify from 'slugify';

import categoryModel from '../models/categoryModel.js';

export const createSubcategoryController = async (req, res) => {
    try {
      const { name, parentCategoryId } = req.body;
  
      if (!name || !parentCategoryId) {
        return res.status(400).send({ success: false, message: 'Name and parentCategoryId are required.' });
      }
  
      // Validate that the parentCategoryId corresponds to an existing category
      const existingCategory = await categoryModel.findById(parentCategoryId);
      if (!existingCategory) {
        return res.status(400).send({ success: false, message: 'Invalid parentCategoryId.' });
      }
  
      const existingSubcategory = await Subcategory.findOne({ name, parentCategory: parentCategoryId });
  
      if (existingSubcategory) {
        return res.status(200).send({ success: true, message: 'Subcategory already exists for this category.' });
      }
  
      const subcategory = await new Subcategory({
        name,
        slug: slugify(name),
        parentCategory: parentCategoryId,
      }).save();
  
      res.status(201).send({ success: true, message: 'New subcategory created.', subcategory });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error, message: 'Error creating subcategory.' });
    }
  };
  
// Get all subcategories
export const subcategoryController = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({}).populate('parentCategory');
    res.status(200).send({ success: true, message: 'All Subcategories List', subcategories });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while getting all subcategories.' });
  }
};

// Update subcategory
export const updateSubcategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({ success: true, message: 'Subcategory updated successfully.', subcategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while updating subcategory.' });
  }
};

// Delete subcategory
export const deleteSubcategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategory.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: 'Subcategory deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while deleting subcategory.' });
  }
};
