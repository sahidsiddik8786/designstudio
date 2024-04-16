import express from "express";
import {
  createDesignimgController,
  deleteDesignimgController,
  getDesignimgController,
  designcategoryPhotoController,
  updateDesignimgController,
  designimgCountController,
} from "../controllers/imagecategoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

// Create design image
router.post(
  "/create-designimg",
  requireSignIn,
  isAdmin,
  formidable(),
  createDesignimgController
);

// Update design image
router.put(
  "/update-designimg/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateDesignimgController
);

// Get all design images
router.get("/get-designimg", getDesignimgController);

// Get design image by ID
router.get("/designimg-photo/:pid", designcategoryPhotoController);

// Delete design image
router.delete("/delete-designimg/:pid", deleteDesignimgController);

// Get design image count
router.get("/designimg-count", designimgCountController);

export default router;
