import User from '../models/userModel.mjs';  // Import Mongoose
import bcrypt from 'bcryptjs';  // Import bcrypt for hashing

// Register a new user
export const registerUser = async (req, res) => {
  const { aadhar, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ aadhar });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ aadhar, password: hashedPassword });
    
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { aadhar, password } = req.body;

  try {
    const user = await User.findOne({ aadhar });
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
    res.status(500).json({ message: 'Login failed', error });
  }
};
