import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Thought, User } from '../models';

interface Params {
    thoughtId: string;
    reactionId: string;
}


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
            res.json(foundThought);
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
        console.log(req.body);
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Add the thought to the user's thoughts array
        const thought = await Thought.create({ thoughtText, username });
        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        return res.json(thought);
    } catch (err) {
        console.error(err)
        return res.status(500).json(err);
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }

        return res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while deleting the thought' });
    }
}

export const addReaction = async (req: Request, res: Response) => {
    console.log('You are adding a reaction');
    console.log(req.body);
    const { reactionBody, username} = req.body;
    if (!reactionBody|| !username) {
        return res.status(400).json({ message: "Missing required fields (text, userId)" });
    }
    try {
        const reaction = { reactionBody, username };
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: reaction } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(thought);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while adding the reaction' });
    }
}

export const removeReaction = async (req: Request<Params>, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        return res.json(thought);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while removing the reaction' });
    }
}