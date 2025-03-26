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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
// Get all users
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_js_1.default.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUsers = getUsers;
// Get a single user
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_js_1.default.findOne({ _id: req.params.userId })
            .select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
});
exports.getSingleUser = getSingleUser;
// create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_js_1.default.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createUser = createUser;
// update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_js_1.default.findByIdAndUpdate({ _id: req.params.userId });
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateUser = updateUser;
// Delete a user and associated apps
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_js_1.default.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json({ message: 'User deleted!' });
    }
    catch (err) {
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
});
exports.deleteUser = deleteUser;
