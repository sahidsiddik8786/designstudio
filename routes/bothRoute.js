// authRoute.js

import express from 'express';
import { loginController } from '../controllers/user&staffController.js';

const router = express.Router();

// Route for user login
router.post('/general-login', loginController);

export default router;
