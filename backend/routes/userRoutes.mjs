import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.mjs'; // Importing controllers

const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;  // Use ES6 export
