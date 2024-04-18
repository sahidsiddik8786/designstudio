import Subcategorydesign from '../models/designsubcategoryModel.js';
import slugify from 'slugify';

import designcategoryModel from '../models/designcategoryModel.js';


export const createdesignSubcategoryController = async (req, res) => {
    try {
      const { name, parentCategorydesignId } = req.body;
  
      if (!name || !parentCategorydesignId) {
        return res.status(400).send({ success: false, message: 'Name and parentCategoryId are required.' });
      }
  
      // Validate that the parentCategoryId corresponds to an existing category
      const existingCategory = await designcategoryModel.findById(parentCategorydesignId);
      if (!existingCategory) {
        return res.status(400).send({ success: false, message: 'Invalid parentCategoryId.' });
      }
      const existingSubcategory = await Subcategorydesign.findOne({ name , parentCategorydesign: parentCategorydesignId})
  
      if (existingSubcategory) {
        return res.status(200).send({ success: true, message: 'Subcategory already exists for this category.' });
      }
  
      const subcategory = await new Subcategorydesign ({
        name,
        slug: slugify(name),
        parentCategorydesign: parentCategorydesignId,
      }).save();
  
      res.status(201).send({ success: true, message: 'New subcategory created.', subcategory });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error, message: 'Error creating subcategory.' });
    }
  };
  
// Get all subcategories
export const subcategorydesignController = async (req, res) => {
  try {
    const subcategory = await Subcategorydesign.find({}).populate('parentCategorydesign');
    res.status(200).send({ success: true, message: 'All Subcategories List', subcategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while getting all subcategories.' });
  }
};

// Get subcategories by category ID
export const subcategoryiddesignController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log("Received category ID:", categoryId);
    const subcategories = await Subcategorydesign.find({ parentCategorydesign: categoryId });
    res.status(200).send({ success: true, message: 'Subcategories by category ID', subcategories }); // Ensure you're sending the subcategories
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while getting subcategories by category ID.' });
  }
};
 

// Update subcategory
export const updateSubcategorydesignController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const subcategory = await Subcategorydesign.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({ success: true, message: 'Subcategory updated successfully.', subcategorydesign });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while updating subcategory.' });
  }
};

// Delete subcategory
export const deleteSubcategorydesignController = async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategorydesign.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: 'Subcategory deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while deleting subcategory.' });
  }
};


