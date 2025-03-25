import thought from '../models/thoughtModel.js';
import { Request, Response } from 'express';


  // Get all users
  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const users = await thought.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single user
  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const user = await thought.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // create a new thought
  export const createThought = async (req: Request, res: Response) => {
    try {
      const user = await thought.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // update a user
  export const updateThought = async (req: Request, res: Response) => {
    try {
      const user = await thought.findByIdAndUpdate({ _id: req.params.userId });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete a user and associated apps
  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const user = await thought.findOneAndDelete({ _id: req.params.userId });
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json({ message: 'User deleted!' });
    } catch (err) {
      res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
  }