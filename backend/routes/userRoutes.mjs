import express from 'express';
const router = express.Router();

import { registerUser, loginUser } from '../controllers/userController.mjs'; // Importing controllers

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;  // Use ES6 export
