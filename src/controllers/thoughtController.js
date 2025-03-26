"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.createThought = exports.getThoughtById = exports.getAllThoughts = exports.thought = exports.totalReactions = void 0;
const mongodb_1 = require("mongodb");
const models_1 = require("../models");
const totalReactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const numberOfReactions = yield models_1.Thought.aggregate()
        .count('totalReactions');
    return numberOfReactions;
});
exports.totalReactions = totalReactions;
const thought = (thoughtId) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Thought.aggregate([
        { $match: { _id: new mongodb_1.ObjectId(thoughtId) } },
        {
            $unwind: '$reactions',
        },
        {
            $group: {
                _id: new mongodb_1.ObjectId(thoughtId), totalReactions: { $sum: 1 }
            },
        },
    ]);
});
exports.thought = thought;
const getAllThoughts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughtText = yield models_1.Thought.find();
        const thoughtObj = {
            thoughtText,
            totalReactions: yield (0, exports.totalReactions)(),
        };
        res.json(thoughtObj);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
});
exports.getAllThoughts = getAllThoughts;
const getThoughtById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId } = req.params;
    try {
        const foundThought = yield models_1.Thought.findById(thoughtId);
        if (foundThought) {
            res.json({
                thought: yield (0, exports.thought)(thoughtId)
            });
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.getThoughtById = getThoughtById;
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { thoughtText, username, userId } = req.body;
        const thought = yield models_1.Thought.create({ thoughtText, username });
        yield models_1.User.findOneAndUpdate({ _id: userId }, { $push: { thoughts: thought._id } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
exports.createThought = createThought;
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield models_1.Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }
        const user = yield models_1.User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        if (!user) {
            console.warn('Thought deleted, but no users found');
        }
        return res.json({ message: 'Thought successfully deleted' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while deleting the thought' });
    }
});
exports.deleteThought = deleteThought;
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('You are adding a reaction');
    console.log(req.body);
    const { text, userId } = req.body;
    if (!text || !userId) {
        return res.status(400).json({ message: "Missing required fields (text, userId)" });
    }
    try {
        const thought = yield models_1.Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(thought);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while adding the reaction' });
    }
});
exports.addReaction = addReaction;
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const thought = yield models_1.Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        const reactionExists = (_a = thought.reactions) === null || _a === void 0 ? void 0 : _a.some((reaction) => { var _a; return ((_a = reaction.reactionId) === null || _a === void 0 ? void 0 : _a.toString()) === req.params.reactionId; });
        if (reactionExists) {
            return res.status(404).json({ message: 'Reaction not found' });
        }
        return res.json(thought);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while removing the reaction' });
    }
});
exports.removeReaction = removeReaction;
