import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    designcategoryController,
    createdesignCategoryController,
    deletedesignCategoryCOntroller,
    singledesignCategoryController,
    updatedesignCategoryController,
    designsubcategoryController,
  
} from "./../controllers/designcategoryController.js";
import { createdesignSubcategoryController, subcategorydesignController,   subcategoryiddesignController  } from "../controllers/designsubcategoryController.js";
import { designsBySubcategoryController} from "../controllers/designController.js";


const router = express.Router();

// Existing routes
// create category
router.post(
  "/create-categorydesign",
  requireSignIn,
  isAdmin,
  createdesignCategoryController
);

//update category
router.put(
  "/update-categorydesign/:id",
  requireSignIn,
  isAdmin,
  updatedesignCategoryController
);

//getALl category
router.get("/get-categorydesign",designcategoryController );

// single category by ID
router.get("/single-categorydesign/:categoryId",singledesignCategoryController);



//delete category
router.delete(
  "/delete-categorydesign/:id",
  requireSignIn,
  isAdmin,
  deletedesignCategoryCOntroller
);


  router.route('/:categoryId/subcategorydesign')
  .get(subcategorydesignController)
  .post(createdesignSubcategoryController);

  router.get("/:categoryId/subcategories", subcategoryiddesignController);

  router.get("/:subcategoryId/products", designsBySubcategoryController);

export default router;
