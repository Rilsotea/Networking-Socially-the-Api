"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reactionModel_js_1 = __importDefault(require("./reactionModel.js"));
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timestamp.toISOString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionModel_js_1.default]
}, {
    toJSON: {
        getters: true,
    },
    timestamps: true,
    id: false
});
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
exports.default = Thought;
