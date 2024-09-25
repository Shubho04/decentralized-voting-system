import User from '../models/userModel.mjs';  // Import Mongoose
import bcrypt from 'bcryptjs';  // Import bcrypt for hashing

// Register a new user
export const registerUser = async (req, res) => {
  const { aadhaarNumber, password } = req.body; // Change to aadhaarNumber
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ aadhaarNumber }); // Change to aadhaarNumber
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ aadhaarNumber, password: hashedPassword }); // Change to aadhaarNumber
    
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Registration failed', error: error.message || error });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { aadhaarNumber, password } = req.body; // Change to aadhaarNumber

  console.log('Login Request Body:', req.body); // Log the incoming request body for debugging

  try {
    const user = await User.findOne({ aadhaarNumber }); // Change to aadhaarNumber
    if (user) {
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // You can generate a token here if you are implementing JWT
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Login failed', error: error.message || error });
  }
};

