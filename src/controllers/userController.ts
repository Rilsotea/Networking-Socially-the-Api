import User from '../models/userModel.js';
import { Request, Response } from 'express';


// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get a single user
export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v');

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// create a new user
export const createUser = async (req, res) => {
  const { username, email } = req.body;
  try {
      const newUser = new User({ username, email });
      await newUser.save();
      res.status(201).json(newUser);
  } catch (error) {
      res.status(400).json({ message: 'Error creating user', error });
  }
};

// update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while updating the user.', error: err.message });
  }
}


// Delete a user and associated apps
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }

    res.json({ message: 'User deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while deleting the user.' });
  }
}