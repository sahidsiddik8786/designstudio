import designcategoryModel from '../models/designcategoryModel.js';
import designsubcategoryModel from '../models/designsubcategoryModel.js';
import slugify from "slugify";

// Create category
export const createdesignCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).send({ message: "Name and Description are required" });
    }
    const existingCategory = await designcategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(409).send({
        success: false,
        message: "Category already exists",
      });
    }
    const categorydesign = await new designcategoryModel({
      name,
      description,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New design-category created",
      categorydesign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating category",
    });
  }
};

// Update category
export const updatedesignCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const categorydesign = await designcategoryModel.findByIdAndUpdate(
      id,
      { name, description, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      categorydesign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// Get all categories
export const designcategoryController = async (req, res) => {
  try {
    const categorydesign = await designcategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      categorydesign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// Get single category by ID
export const singledesignCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.categoryId; // Assuming parameter name is categoryId
    const categorydesign = await designcategoryModel.findById(categoryId);
    if (!categorydesign) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      categorydesign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};


// Delete category
export const deletedesignCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await designcategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Design Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting design category",
      error,
    });
  }
};

// Get subcategories by parent category ID
export const designsubcategoryController = async (req, res) => {
  try {
    const { categorydesignId } = req.params;
    const subcategories = await designsubcategoryModel.find({ category: categorydesignId });
    res.status(200).send({ success: true, message: 'Subcategories for category retrieved successfully.', subcategories });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: 'Error while getting subcategories for category.' });
  }
};
