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
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
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