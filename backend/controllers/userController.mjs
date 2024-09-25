import User from '../models/userModel.mjs';  // Import Mongoose

export const registerUser = async (req, res) => {
  const { aadhar, password } = req.body;
  
  try {
    const user = new User({ aadhar, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

export const loginUser = async (req, res) => {
  const { aadhar, password } = req.body;

  try {
    const user = await User.findOne({ aadhar });
    if (user && user.password === password) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
