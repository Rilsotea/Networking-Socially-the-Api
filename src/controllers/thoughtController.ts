import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Thought, User } from '../models/index.js';


export const totalReactions = async () => {
    const numberOfReactions = await Thought.aggregate()
        .count('totalReactions');
    return numberOfReactions;
}

export const thought = async (thoughtId: string) =>
    Thought.aggregate([

        { $match: { _id: new ObjectId(thoughtId) } },
        {
            $unwind: '$reactions',
        },
        {
            $group: {
                _id: new ObjectId(thoughtId), totalReactions: { $sum: 1 }
            },
        },
    ]);

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughtText = await Thought.find();

        const thoughtObj = {
            thoughtText,
            totalReactions: await totalReactions(),
        }

        res.json(thoughtObj);
    } catch (error: any) {
        console.error(error)
        res.status(500).json({
            message: error.message
        });
    }
}

export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const foundThought = await Thought.findById(thoughtId);
        if (foundThought) {
            res.json({
                thought: await thought(thoughtId)
            });
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const { thoughtText, username, userId } = req.body;
        const thought = await Thought.create({ thoughtText, username });
        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'Thought deleted, but no users found',
            });
        }

        return res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export const addReaction = async (req: Request, res: Response) => {
    console.log('You are adding an reaction');
    console.log(req.body);
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: "Missing required fields (text, userId)" });
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}