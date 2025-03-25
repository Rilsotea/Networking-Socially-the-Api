import thought from '../models/thoughtModel.js';
import { Request, Response } from 'express';


// Get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get a single thought
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const singleThought = await thought.findOne({ _id: req.params.thoughtId })
      .select('-__v');

    if (!singleThought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

// create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await thought.create(req.body);
    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
}

// update a thought
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deletedThought = await thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!deletedThought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while deleting the thought.' });
  }
}