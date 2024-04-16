import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
  categorySubcategoriesController,
} from "./../controllers/categoryController.js";
import { createSubcategoryController } from "../controllers/subcategoryController.js";
import { productsBySubcategoryController } from "../controllers/productController.js";


const router = express.Router();

// Existing routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryController);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);
// Add this route for subcategories

// Update the route to include 'subcategories'
router.route('/:categoryId/subcategories')
  .get(categorySubcategoriesController)
  .post(createSubcategoryController);


router.get("/:subcategoryId/products", productsBySubcategoryController);


export default router;