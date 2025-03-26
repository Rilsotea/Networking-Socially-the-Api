"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thought = exports.User = void 0;
const thoughtModel_js_1 = __importDefault(require("./thoughtModel.js"));
exports.Thought = thoughtModel_js_1.default;
const userModel_js_1 = __importDefault(require("./userModel.js"));
exports.User = userModel_js_1.default;
