import express from 'express';
import UserModel from '../models/User2.js'

const router = express.Router();

// Get all users
router.get('/getall', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post('/create', async (req, res) => {
  const { name, code, status } = req.body;

  if (!name || !code) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }

  try {
    const newUser = new UserModel({ name, code, status });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user by ID
router.put('/update/:id', async (req, res) => {
  const { name, code, status } = req.body;

  if (!name || !code) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, code, status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;