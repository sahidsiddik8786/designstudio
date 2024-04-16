import express from "express";
import multer from "multer";
import { createSite, getSitesByUserId , getSites } from "../controllers/siteController.js";

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory (for buffer access)
const upload = multer({ storage: storage });

// Route for creating a new site with images
router.post("/sites", upload.array("images", 5), createSite);

router.get('/all-sites', getSites);

router.get('/user/:userId/images', getSitesByUserId);
export default router;
